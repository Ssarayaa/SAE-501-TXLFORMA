package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Paiement;
import com.pixeldev.txlforma.model.Inscription;
import com.pixeldev.txlforma.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaiementService {

    private final PaiementRepository paiementRepository;
    private final InscriptionService inscriptionService;

    @Autowired
    public PaiementService(PaiementRepository paiementRepository, InscriptionService inscriptionService) {
        this.paiementRepository = paiementRepository;
        this.inscriptionService = inscriptionService;
    }

    @Transactional
    public Paiement enregistrerPaiement(Paiement paiement, Long inscriptionId) throws Exception {

        // 1. Récupérer l'inscription
        // Nous allons supposer une méthode findById() dans InscriptionService
        Inscription inscription = inscriptionService.findById(inscriptionId);

        // 2. Sauvegarder l'entité Paiement
        Paiement nouveauPaiement = paiementRepository.save(paiement);

        // 3. Mettre à jour l'inscription (logique métier)
        inscription.setPaiement(nouveauPaiement);
        inscription.setStatutPaiement("payé");

        // Sauvegarder l'inscription mise à jour
        // Bien que @Transactional puisse suffire, une sauvegarde explicite peut être ajoutée pour clarté
        // inscriptionService.save(inscription);

        return nouveauPaiement;
    }
}