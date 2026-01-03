package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;

@Entity
@Table(name = "inscription")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateInscription = LocalDate.now();
    private Double noteFinale;
    private String statutInscription = "EN_ATTENTE";
    private String statutPaiement = "NON_PAYE";

    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    @JsonIgnoreProperties({"inscriptions", "password", "paiements"})
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    @JsonIgnoreProperties("inscriptions")
    private Session session;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "paiement_id")
    private Paiement paiement;
}