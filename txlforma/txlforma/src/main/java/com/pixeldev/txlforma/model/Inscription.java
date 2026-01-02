package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
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

    @Column(name = "date_inscription")
    private LocalDate dateInscription = LocalDate.now();

    @Column(name = "note_finale")
    private Double noteFinale;

    @Column(name = "statut_inscription")
    private String statutInscription = "EN_ATTENTE";

    @Column(name = "statut_paiement")
    private String statutPaiement = "NON_PAYE";

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    // Cette ligne corrige l'erreur "cannot find symbol setPaiement"
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "paiement_id", referencedColumnName = "id")
    private Paiement paiement;
}