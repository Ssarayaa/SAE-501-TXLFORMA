package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Emargement;
import com.pixeldev.txlforma.model.Session;
import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.repository.EmargementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmargementService {

    private final EmargementRepository emargementRepository;
    private final SessionService sessionService;
    private final UtilisateurService utilisateurService;

    @Autowired
    public EmargementService(
            EmargementRepository emargementRepository,
            SessionService sessionService,
            UtilisateurService utilisateurService) {
        this.emargementRepository = emargementRepository;
        this.sessionService = sessionService;
        this.utilisateurService = utilisateurService;
    }

    // MÉTHODE CONCERNÉE PAR L'ERREUR
    public Emargement enregistrerPresence(Long utilisateurId, Long sessionId, LocalDate date) throws Exception {
        Utilisateur utilisateur = utilisateurService.findById(utilisateurId);
        Session session = sessionService.findById(sessionId);

        // Vérifier si un émargement existe déjà pour ce jour
        if (emargementRepository.findByUtilisateurIdAndSessionIdAndDate(utilisateurId, sessionId, date).isPresent()) {
            throw new Exception("La présence est déjà enregistrée pour cette date.");
        }

        Emargement emargement = new Emargement();
        emargement.setUtilisateur(utilisateur);
        emargement.setSession(session);
        emargement.setDate(date);
        emargement.setStatut("PRESENT");
        emargement.setValideParIntervenant(true); // Si c'est l'admin/intervenant qui enregistre

        return emargementRepository.save(emargement);
    }

    public Emargement signerMaPresence(Long utilisateurId, Long sessionId) throws Exception {
        LocalDate aujourdhui = LocalDate.now();
        return emargementRepository.findByUtilisateurIdAndSessionIdAndDate(utilisateurId, sessionId, aujourdhui)
                .map(e -> {
                    e.signer();
                    return emargementRepository.save(e);
                })
                .orElseGet(() -> {
                    try {
                        Utilisateur u = utilisateurService.findById(utilisateurId);
                        Session s = sessionService.findById(sessionId);
                        Emargement e = new Emargement();
                        e.setUtilisateur(u);
                        e.setSession(s);
                        e.setDate(aujourdhui);
                        e.signer();
                        return emargementRepository.save(e);
                    } catch (Exception ex) {
                        throw new RuntimeException(ex.getMessage());
                    }
                });
    }

    public List<Emargement> findBySession(Long sessionId) {
        return emargementRepository.findBySessionId(sessionId);
    }
}