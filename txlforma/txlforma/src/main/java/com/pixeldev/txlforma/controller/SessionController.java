package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Session;
import com.pixeldev.txlforma.model.Formation;
import com.pixeldev.txlforma.model.Intervenant;
import com.pixeldev.txlforma.repository.SessionRepository;
import com.pixeldev.txlforma.repository.FormationRepository;
import com.pixeldev.txlforma.repository.IntervenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sessions")
// CORRECTION CORS : On autorise 5173 ET 5174
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private IntervenantRepository intervenantRepository;

    // Récupérer toutes les sessions (Utilisé par Profil.js pour l'agenda)
    @GetMapping("/all")
    public List<Session> getAllAlias() {
        return sessionRepository.findAll();
    }

    // Garder le endpoint racine aussi, au cas où
    @GetMapping
    public List<Session> getAll() {
        return sessionRepository.findAll();
    }

    // Récupérer les sessions pour une formation spécifique
    @GetMapping("/formation/{id}")
    public List<Session> getByFormation(@PathVariable Long id) {
        return sessionRepository.findByFormationId(id);
    }

    // Créer une session (Utilisé par Profil.js lors du clic sur "Publier")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Session session) {
        try {
            // 1. Vérification et liaison de la Formation
            if (session.getFormation() != null && session.getFormation().getId() != null) {
                Optional<Formation> f = formationRepository.findById(session.getFormation().getId());
                if (f.isPresent()) {
                    session.setFormation(f.get());
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Formation introuvable avec l'ID fourni.");
                }
            } else {
                return ResponseEntity.badRequest().body("L'ID de la formation est obligatoire.");
            }

            // 2. Vérification et liaison de l'Intervenant
            if (session.getIntervenant() != null && session.getIntervenant().getId() != null) {
                Optional<Intervenant> i = intervenantRepository.findById(session.getIntervenant().getId());
                if (i.isPresent()) {
                    session.setIntervenant(i.get());
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Intervenant introuvable avec l'ID fourni.");
                }
            } else {
                return ResponseEntity.badRequest().body("L'ID de l'intervenant est obligatoire.");
            }

            // 3. Sauvegarde
            Session savedSession = sessionRepository.save(session);
            return ResponseEntity.ok(savedSession);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur serveur : " + e.getMessage());
        }
    }
}