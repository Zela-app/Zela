package com.zela.controller;

import com.zela.model.Usuario;
import com.zela.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") 
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @GetMapping
    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    @PostMapping("/cadastrar")
    public Usuario criarUsuario(@RequestBody Usuario novoUsuario) {
        // Trava de segurança: Se o tipo vier nulo, define como "usuario" padrão
        if (novoUsuario.getTipoUsuario() == null || novoUsuario.getTipoUsuario().trim().isEmpty()) {
            novoUsuario.setTipoUsuario("usuario");
        }
        return repository.save(novoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> fazerLogin(@RequestBody Usuario dadosLogin) {
        Usuario usuarioBuscado = repository.findByEmailAndSenha(dadosLogin.getEmail(), dadosLogin.getSenha());
        
        // Criamos um "dicionário" que o Spring vai transformar em JSON automaticamente
        Map<String, String> resposta = new HashMap<>();

        if (usuarioBuscado != null) {
            resposta.put("mensagem", "Sucesso");
            
            // Pega o tipo do banco. Se for nulo (usuários antigos), devolve "usuario"
            String tipo = usuarioBuscado.getTipoUsuario() != null ? usuarioBuscado.getTipoUsuario() : "usuario";
            resposta.put("tipoUsuario", tipo);

            // ==========================================
            // ENVIA O NOME DO USUÁRIO PARA O FRONTEND
            // ==========================================
            resposta.put("nome", usuarioBuscado.getNome());
    // ADICIONE ESTA LINHA:
    resposta.put("idUsuario", String.valueOf(usuarioBuscado.getIdUsuario()));

            return ResponseEntity.ok(resposta);
        } else {
            resposta.put("mensagem", "Falha");
            return ResponseEntity.status(401).body(resposta);
        }
    }
    // ==========================================
    // NOVAS ROTAS PARA A TELA DE PERFIL
    // ==========================================

    // 1. BUSCAR dados completos da usuária pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        return repository.findById(id)
                .map(usuario -> ResponseEntity.ok(usuario))
                .orElse(ResponseEntity.notFound().build());
    }

    // 2. ATUALIZAR dados do perfil da usuária
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarPerfil(@PathVariable Integer id, @RequestBody Usuario dadosAtualizados) {
        return repository.findById(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNome(dadosAtualizados.getNome());
                    usuarioExistente.setEmail(dadosAtualizados.getEmail());
                    usuarioExistente.setTelefone(dadosAtualizados.getTelefone());
                    
                    // Nota: Se você não colocou Endereço no banco de dados na hora do Cadastro,
                    // nós podemos pular essa parte ou adicioná-la depois. Por enquanto, focamos
                    // nos dados que a usuária já cadastrou (Nome, Email, Telefone e Data de Nasc).
                    
                    return ResponseEntity.ok(repository.save(usuarioExistente));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}