package com.zela.repository;

import com.zela.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    // Aqui o Spring já cria para você métodos como:
    // .save(), .findAll(), .findById(), .deleteById()
}
