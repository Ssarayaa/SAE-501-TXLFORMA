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

    private double montant;

    private String statut = "COMPLETED";

    private String methode;

    @Column(name = "reference_transaction")
    private String referenceTransaction;

    @OneToOne(mappedBy = "paiement")
    private Inscription inscription;

    @Column(name = "transactionid")
    private String transactionid;

    @Column(name = "moyen_paiement")
    private String moyenPaiement;

}