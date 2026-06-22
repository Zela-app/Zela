package com.zela.controller;

import com.zela.model.Mensagem;
import com.zela.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mensagens")
@CrossOrigin(origins = "*")
public class MensagemController {

    @Autowired
    private MensagemRepository repository;

    // 1. ENVIAR uma nova mensagem
    @PostMapping
    public Mensagem enviarMensagem(@RequestBody Mensagem novaMensagem) {
        return repository.save(novaMensagem);
    }

    // 2. BUSCAR o histórico da conversa entre dois usuários
    @GetMapping("/conversa/{idUsuario1}/{idUsuario2}")
    public List<Mensagem> buscarConversa(@PathVariable Integer idUsuario1, @PathVariable Integer idUsuario2) {
        return repository.buscarHistoricoConversa(idUsuario1, idUsuario2);
    }
}