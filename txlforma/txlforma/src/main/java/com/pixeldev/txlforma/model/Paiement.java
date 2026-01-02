package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime datePaiement = LocalDateTime.now();

    // Le montant payé
    private double montant;

    // Statut du paiement (ex: COMPLETED, FAILED, REFUNDED)
    private String statut = "COMPLETED";

    // Méthode ou référence de paiement (ex: CARTE, VIREMENT, PAYPAL)
    private String methode;

    // Référence externe de la transaction (si intégration avec Stripe, PayPal, etc.)
    private String referenceTransaction;

    // Relation One-to-One vers Inscription (la relation inverse)
    @OneToOne(mappedBy = "paiement")
    private Inscription inscription;
}