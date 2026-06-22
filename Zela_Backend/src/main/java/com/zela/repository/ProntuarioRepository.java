package com.zela.repository;

import com.zela.model.Prontuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProntuarioRepository extends JpaRepository<Prontuario, Integer> {
    
    // Busca todos os relatórios feitos por um psicólogo específico (para os contadores da Home)
    List<Prontuario> findByIdPsicologo(Integer idPsicologo);
    
    // Busca todos os relatórios de uma paciente específica
    List<Prontuario> findByIdPaciente(Integer idPaciente);
}