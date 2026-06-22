package com.zela.repository;

import com.zela.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {
    
    // Busca todos os contatos de uma usuária
    List<Contato> findByIdUsuario(Integer idUsuario);
}