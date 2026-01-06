package com.pixeldev.txlforma.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscriptionRequest {
    // Infos pour l'Inscription
    private Long utilisateurId;
    private Long sessionId;

    // Infos pour la table Paiement
    private Double montant;              // Utiliser Double (majuscule) est plus sûr
    private String methode;              // ex: "CARTE_BANCAIRE"
    private String moyenPaiement;        // ex: "CARTE"
    private String transactionid;
    private String referenceTransaction;
    private String statut;
}