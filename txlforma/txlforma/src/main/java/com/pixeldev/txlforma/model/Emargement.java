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

    // Valeur par défaut
    private String statut = "ABSENT";

    @Column(columnDefinition = "LONGTEXT")
    private String signature;

    private boolean signeParParticipant = false;
    private boolean valideParIntervenant = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    // --- MÉTHODES DE LOGIQUE MÉTIER ---

    // Appelé par le Controller lors de la signature via le Canvas
    public void signer(String signatureData) {
        this.signature = signatureData;
        this.signeParParticipant = true;
        this.statut = "SIGNE"; // Met à jour le statut immédiatement
    }

    // Appelé par le Service (compatibilité)
    public void signer() {
        this.signeParParticipant = true;
        this.statut = "SIGNE";
    }

    public void validerPresence() {
        if (this.signeParParticipant) {
            this.valideParIntervenant = true;
            this.statut = "PRESENT";
        }
    }
}