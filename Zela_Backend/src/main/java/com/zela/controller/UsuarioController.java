package com.zela.controller;

import com.zela.model.Usuario;
import com.zela.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

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
        return repository.save(novoUsuario);
    }

    // Agora o método está DENTRO da classe, entre as chaves!
    @PostMapping("/login")
    public ResponseEntity<String> fazerLogin(@RequestBody Usuario dadosLogin) {
        Usuario usuarioBuscado = repository.findByEmailAndSenha(dadosLogin.getEmail(), dadosLogin.getSenha());
        
        if (usuarioBuscado != null) {
            return ResponseEntity.ok("Sucesso");
        } else {
            return ResponseEntity.status(401).body("Falha");
        }
    }
} // <--- A chave de fechamento da classe fica aqui no final!
