package com.zela.controller;

import com.zela.model.Anotacao;
import com.zela.repository.AnotacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anotacoes")
@CrossOrigin(origins = "*")
public class AnotacaoController {

    @Autowired
    private AnotacaoRepository repository;

    // 1. CRIAR uma nova anotação
    @PostMapping
    public Anotacao criarAnotacao(@RequestBody Anotacao novaAnotacao) {
        return repository.save(novaAnotacao);
    }

    // 2. LER todas as anotações de uma usuária específica
    @GetMapping("/usuario/{idUsuario}")
    public List<Anotacao> listarPorUsuario(@PathVariable Integer idUsuario) {
        return repository.findByIdUsuarioOrderByDataCriacaoDesc(idUsuario);
    }

    // 3. DELETAR uma anotação
    @DeleteMapping("/{idAnotacao}")
    public ResponseEntity<String> deletarAnotacao(@PathVariable Integer idAnotacao) {
        if(repository.existsById(idAnotacao)) {
            repository.deleteById(idAnotacao);
            return ResponseEntity.ok("Anotação excluída");
        }
        return ResponseEntity.notFound().build();
    }

    // 4. EDITAR uma anotação existente
    @PutMapping("/{idAnotacao}")
    public ResponseEntity<Anotacao> editarAnotacao(@PathVariable Integer idAnotacao, @RequestBody Anotacao anotacaoAtualizada) {
        return repository.findById(idAnotacao)
                .map(anotacao -> {
                    anotacao.setTitulo(anotacaoAtualizada.getTitulo());
                    anotacao.setConteudo(anotacaoAtualizada.getConteudo());
                    return ResponseEntity.ok(repository.save(anotacao));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}