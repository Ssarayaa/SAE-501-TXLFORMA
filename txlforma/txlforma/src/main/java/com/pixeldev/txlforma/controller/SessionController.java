package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Session;
import com.pixeldev.txlforma.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*") //
public class SessionController {

    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    /**
     * Récupérer toutes les sessions (pour l'affichage côté utilisateur/admin)
     */
    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.findAll();
        return ResponseEntity.ok(sessions);
    }

    /**
     * Récupérer une session par son ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        try {
            Session session = sessionService.findById(id);
            return ResponseEntity.ok(session);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Créer une nouvelle session (depuis le panel Admin)
     * POST /api/sessions
     */
    @PostMapping
    public ResponseEntity<?> createSession(@RequestBody Session session) {
        try {
            // On vérifie quand même si une formation est bien rattachée
            if (session.getFormation() == null) {
                return ResponseEntity.badRequest().body("Erreur : Une formation est obligatoire pour créer une session.");
            }
            Session savedSession = sessionService.save(session);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSession);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la création de la session : " + e.getMessage());
        }
    }
}