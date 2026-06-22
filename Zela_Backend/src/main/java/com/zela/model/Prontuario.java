package com.zela.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prontuario")
public class Prontuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prontuario")
    private Integer idProntuario;

    @Column(name = "id_paciente", nullable = false)
    private Integer idPaciente;

    @Column(name = "id_psicologo", nullable = false)
    private Integer idPsicologo;

    @Column(name = "data_nascimento", length = 20)
    private String dataNascimento;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String relatorio;

    @Column(name = "data_criacao", insertable = false, updatable = false)
    private LocalDateTime dataCriacao;

    // === GETTERS E SETTERS ===
    public Integer getIdProntuario() { return idProntuario; }
    public void setIdProntuario(Integer idProntuario) { this.idProntuario = idProntuario; }

    public Integer getIdPaciente() { return idPaciente; }
    public void setIdPaciente(Integer idPaciente) { this.idPaciente = idPaciente; }

    public Integer getIdPsicologo() { return idPsicologo; }
    public void setIdPsicologo(Integer idPsicologo) { this.idPsicologo = idPsicologo; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getRelatorio() { return relatorio; }
    public void setRelatorio(String relatorio) { this.relatorio = relatorio; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
}