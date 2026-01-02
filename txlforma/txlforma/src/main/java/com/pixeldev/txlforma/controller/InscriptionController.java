package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Inscription;
import com.pixeldev.txlforma.service.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "*")
public class InscriptionController {

    private final InscriptionService inscriptionService;

    @Autowired
    public InscriptionController(InscriptionService inscriptionService) {
        this.inscriptionService = inscriptionService;
    }


    @PostMapping
    public ResponseEntity<?> inscrireUtilisateur(
            @RequestParam Long utilisateurId,
            @RequestParam Long sessionId) {
        try {
            Inscription inscription = inscriptionService.inscrireUtilisateur(utilisateurId, sessionId);
            // Retourne l'inscription créée avec le statut 201 CREATED
            return new ResponseEntity<>(inscription, HttpStatus.CREATED);
        } catch (Exception e) {
            // Gère les erreurs métier (Déjà inscrit, Session complète, Utilisateur/Session introuvable)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Inscription> getInscriptionById(@PathVariable Long id) {
        try {
            Inscription inscription = inscriptionService.findById(id);
            return ResponseEntity.ok(inscription);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}