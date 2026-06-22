package com.zela.controller;

import com.zela.model.Contato;
import com.zela.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contatos")
@CrossOrigin(origins = "*")
public class ContatoController {

    @Autowired
    private ContatoRepository repository;

    // 1. CRIAR
    @PostMapping
    public Contato criarContato(@RequestBody Contato novoContato) {
        return repository.save(novoContato);
    }

    // 2. LER (Por Usuária)
    @GetMapping("/usuario/{idUsuario}")
    public List<Contato> listarPorUsuario(@PathVariable Integer idUsuario) {
        return repository.findByIdUsuario(idUsuario);
    }

    // 3. DELETAR
    @DeleteMapping("/{idContato}")
    public ResponseEntity<String> deletarContato(@PathVariable Integer idContato) {
        if(repository.existsById(idContato)) {
            repository.deleteById(idContato);
            return ResponseEntity.ok("Contato excluído");
        }
        return ResponseEntity.notFound().build();
    }

    // 4. EDITAR
    @PutMapping("/{idContato}")
    public ResponseEntity<Contato> editarContato(@PathVariable Integer idContato, @RequestBody Contato contatoAtualizado) {
        return repository.findById(idContato)
                .map(contato -> {
                    contato.setNome(contatoAtualizado.getNome());
                    contato.setTelefone(contatoAtualizado.getTelefone());
                    contato.setLocalizacao(contatoAtualizado.getLocalizacao());
                    return ResponseEntity.ok(repository.save(contato));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}