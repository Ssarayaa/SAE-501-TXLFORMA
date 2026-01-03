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

    public Emargement findById(Long id) throws Exception {
        return emargementRepository.findById(id)
                .orElseThrow(() -> new Exception("Émargement introuvable avec l'ID: " + id));
    }


    public Emargement enregistrerPresence(Long utilisateurId, Long sessionId, LocalDate date) throws Exception {

        Utilisateur utilisateur = utilisateurService.findById(utilisateurId);
        Session session = sessionService.findById(sessionId);


        if (emargementRepository.findByUtilisateurIdAndSessionIdAndDate(utilisateurId, sessionId, date).isPresent()) {
            throw new Exception("La présence de cet utilisateur est déjà enregistrée pour cette session à cette date.");
        }

        // 3. Enregistrement de l'émargement
        Emargement emargement = new Emargement();
        emargement.setUtilisateur(utilisateur);
        emargement.setSession(session);
        emargement.setDate(date);
        emargement.setStatut("présent");
        return emargementRepository.save(emargement);
    }

    public List<Emargement> findBySession(Long sessionId) {
        return emargementRepository.findBySessionId(sessionId);
    }
}