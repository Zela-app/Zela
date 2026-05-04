package com.zela.controller;

// Estes são os "endereços" que o Java precisa para entender os comandos abaixo
import com.zela.model.Usuario;
import com.zela.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite que seu Front-end acesse o Back-end
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    // Método para listar todos (bom para testar se o banco está funcionando)
    @GetMapping
    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    // O seu método de cadastrar que você já tinha criado
    @PostMapping("/cadastrar")
    public Usuario criarUsuario(@RequestBody Usuario novoUsuario) {
        return repository.save(novoUsuario);
    }
}