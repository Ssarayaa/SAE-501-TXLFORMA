package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "emargement")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emargement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String statut = "ABSENT"; // ABSENT, SIGNE, PRESENT (validé)

    private boolean signeParParticipant = false; // Le participant coche ceci
    private boolean valideParIntervenant = false; // L'intervenant coche cela

    @ManyToOne(fetch = FetchType.EAGER) // EAGER pour voir qui émerge dans l'interface
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    // Méthode pour le Participant
    public void signer() {
        this.signeParParticipant = true;
        this.statut = "SIGNE";
    }

    // Méthode pour l'Intervenant
    public void validerPresence() {
        if (this.signeParParticipant) {
            this.valideParIntervenant = true;
            this.statut = "PRESENT";
        }
    }
}