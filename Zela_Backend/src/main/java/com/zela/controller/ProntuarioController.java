package com.zela.controller;

import com.zela.model.Prontuario;
import com.zela.repository.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prontuarios")
@CrossOrigin(origins = "*")
public class ProntuarioController {

    @Autowired
    private ProntuarioRepository repository;

    // 1. SALVAR um novo prontuário/relatório
    @PostMapping
    public Prontuario salvarProntuario(@RequestBody Prontuario novoProntuario) {
        return repository.save(novoProntuario);
    }

    // 2. LISTAR relatórios feitos por uma psicóloga específica
    @GetMapping("/psicologo/{idPsicologo}")
    public List<Prontuario> listarPorPsicologo(@PathVariable Integer idPsicologo) {
        return repository.findByIdPsicologo(idPsicologo);
    }

    // 3. LISTAR relatórios de uma paciente específica
    @GetMapping("/paciente/{idPaciente}")
    public List<Prontuario> listarPorPaciente(@PathVariable Integer idPaciente) {
        return repository.findByIdPaciente(idPaciente);
    }
}