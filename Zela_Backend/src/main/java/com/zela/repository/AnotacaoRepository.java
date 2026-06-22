package com.zela.repository;

import com.zela.model.Anotacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnotacaoRepository extends JpaRepository<Anotacao, Integer> {
    
    // Mágica do Spring: Ele cria o SQL sozinho só de ler o nome deste método!
    // Ele vai buscar todas as anotações do usuário e ordenar da mais nova pra mais velha.
    List<Anotacao> findByIdUsuarioOrderByDataCriacaoDesc(Integer idUsuario);
}