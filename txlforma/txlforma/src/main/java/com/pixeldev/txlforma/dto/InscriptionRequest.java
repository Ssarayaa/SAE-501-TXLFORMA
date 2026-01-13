package com.pixeldev.txlforma.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscriptionRequest {
    private Long utilisateurId;
    private Long sessionId;

    private Double montant;
    private String methode;
    private String moyenPaiement;
    private String transactionid;
    private String referenceTransaction;
    private String statut;
}