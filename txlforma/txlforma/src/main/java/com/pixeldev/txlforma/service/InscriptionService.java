package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.*;
import com.pixeldev.txlforma.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class InscriptionService {

    @Autowired private InscriptionRepository inscriptionRepository;
    @Autowired private SessionRepository sessionRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private PaiementRepository paiementRepository;

    @Transactional
    public Inscription creerInscriptionAvecPaiement(Long utilisateurId, Long sessionId, Double montant, String methode, String transId, String refTrans, String moyenPaiement) throws Exception {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new Exception("Session introuvable"));

        if (session.getNbPlaces() <= 0) throw new Exception("Plus de places disponibles");

        Paiement paiement = new Paiement();
        paiement.setMontant(montant);
        paiement.setDatePaiement(LocalDateTime.now());
        paiement.setStatut("COMPLETED");
        paiement.setMethode(methode);
        paiement.setTransactionid(transId);
        paiement.setReferenceTransaction(refTrans);
        paiement.setMoyenPaiement(moyenPaiement);

        paiement = paiementRepository.save(paiement);

        Utilisateur user = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new Exception("Utilisateur introuvable"));

        return finaliserInscription(user, session, paiement, "PAYE");
    }

    @Transactional
    public Inscription inscrireManuellement(Long utilisateurId, Long sessionId) throws Exception {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new Exception("Session introuvable"));

        if (session.getNbPlaces() <= 0) throw new Exception("Plus de places disponibles");

        Utilisateur user = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new Exception("Utilisateur introuvable"));

        return finaliserInscription(user, session, null, "ADMIN_VALIDATED");
    }

    // --- NOUVELLE MÉTHODE : AVANCER PROGRESSION ---
    public Inscription avancerProgression(Long inscriptionId) throws Exception {
        Inscription ins = inscriptionRepository.findById(inscriptionId)
                .orElseThrow(() -> new Exception("Inscription introuvable"));

        // On ajoute 5% sans dépasser 100%
        if (ins.getProgression() < 100) {
            int nouvelleProgression = ins.getProgression() + 5;
            ins.setProgression(Math.min(nouvelleProgression, 100));

            // Si 100% atteint, on valide la formation
            if (ins.getProgression() >= 100) {
                ins.setStatutInscription("TERMINEE"); // ou "CERTIFIEE" selon ta logique
            }
            return inscriptionRepository.save(ins);
        }
        return ins;
    }
    // ----------------------------------------------

    private Inscription finaliserInscription(Utilisateur user, Session session, Paiement paiement, String statutPaiement) {
        Inscription ins = new Inscription();
        ins.setUtilisateur(user);
        ins.setSession(session);
        ins.setPaiement(paiement);
        ins.setDateInscription(LocalDateTime.now());
        ins.setStatutInscription("VALIDEE"); // Statut de départ
        ins.setStatutPaiement(statutPaiement);
        // Progression est à 0 par défaut grâce au modèle

        session.setNbPlaces(session.getNbPlaces() - 1);
        sessionRepository.save(session);
        return inscriptionRepository.save(ins);
    }
}