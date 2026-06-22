package com.zela.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mensagem")
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensagem")
    private Integer idMensagem;

    @Column(name = "id_remetente", nullable = false)
    private Integer idRemetente;

    @Column(name = "id_destinatario", nullable = false)
    private Integer idDestinatario;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String conteudo;

    @Column(name = "data_envio", insertable = false, updatable = false)
    private LocalDateTime dataEnvio;

    // === GETTERS E SETTERS ===
    public Integer getIdMensagem() { return idMensagem; }
    public void setIdMensagem(Integer idMensagem) { this.idMensagem = idMensagem; }

    public Integer getIdRemetente() { return idRemetente; }
    public void setIdRemetente(Integer idRemetente) { this.idRemetente = idRemetente; }

    public Integer getIdDestinatario() { return idDestinatario; }
    public void setIdDestinatario(Integer idDestinatario) { this.idDestinatario = idDestinatario; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }
}
