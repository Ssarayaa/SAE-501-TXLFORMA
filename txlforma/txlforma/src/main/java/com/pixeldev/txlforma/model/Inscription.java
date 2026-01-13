package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateInscription = LocalDateTime.now();

    private String statutInscription = "EN_ATTENTE";
    private String statutPaiement;

    private int progression = 0;

    // --- CORRECTION MAJEURE ICI ---
    // J'ai enlevé @JsonIgnore pour que le front reçoive les infos du user (nom, prénom)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "session_id")
    @JsonIgnoreProperties({"inscriptions", "emargements", "intervenant"})
    private Session session;

    @OneToOne
    @JoinColumn(name = "paiement_id")
    @JsonIgnore
    private Paiement paiement;
}