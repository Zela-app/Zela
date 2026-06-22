package com.zela.repository;

import com.zela.model.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MensagemRepository extends JpaRepository<Mensagem, Integer> {

    // Busca todas as mensagens trocidas entre duas pessoas e ordena da mais antiga para a mais nova
    @Query("SELECT m FROM Mensagem m WHERE (m.idRemetente = :id1 AND m.idDestinatario = :id2) OR (m.idRemetente = :id2 AND m.idDestinatario = :id1) ORDER BY m.dataEnvio ASC")
    List<Mensagem> buscarHistoricoConversa(@Param("id1") Integer id1, @Param("id2") Integer id2);
}