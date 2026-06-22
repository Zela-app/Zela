package com.zela.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "anotacao")
public class Anotacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_anotacao")
    private Integer idAnotacao;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String conteudo;

    // O banco preenche a data sozinho!
    @Column(name = "data_criacao", insertable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;

    // === GETTERS E SETTERS ===
    public Integer getIdAnotacao() { return idAnotacao; }
    public void setIdAnotacao(Integer idAnotacao) { this.idAnotacao = idAnotacao; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }
}