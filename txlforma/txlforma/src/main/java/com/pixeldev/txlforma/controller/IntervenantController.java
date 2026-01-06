package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Intervenant;
import com.pixeldev.txlforma.service.IntervenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/intervenants")
@CrossOrigin(origins = "http://localhost:5173") // Mieux vaut mettre l'URL précise du front
public class IntervenantController {

    private final IntervenantService intervenantService;

    @Autowired
    public IntervenantController(IntervenantService intervenantService) {
        this.intervenantService = intervenantService;
    }

    // Créer ou modifier un intervenant
    @PostMapping("/add")
    public ResponseEntity<Intervenant> createIntervenant(@RequestBody Intervenant intervenant) {
        Intervenant nouveau = intervenantService.save(intervenant);
        return new ResponseEntity<>(nouveau, HttpStatus.CREATED);
    }

    // Récupérer tous les intervenants
    @GetMapping("/all")
    public ResponseEntity<List<Intervenant>> getAllIntervenants() {
        List<Intervenant> intervenants = intervenantService.findAll();
        return ResponseEntity.ok(intervenants);
    }

    // Récupérer un intervenant par son ID (table intervenant)
    @GetMapping("/{id}")
    public ResponseEntity<Intervenant> getIntervenantById(@PathVariable Long id) {
        Intervenant intervenant = intervenantService.findById(id);
        if (intervenant != null) {
            return ResponseEntity.ok(intervenant);
        }
        return ResponseEntity.notFound().build();
    }

    // --- NOUVEAU : Récupérer les spécialités uniques (pour l'AdminPanel) ---
    @GetMapping("/specialites")
    public ResponseEntity<List<String>> getSpecialites() {
        return ResponseEntity.ok(intervenantService.findDistinctSpecialites());
    }

    // --- CRUCIAL : Récupérer un intervenant via son ID Utilisateur (pour IntervenantPanel) ---
    // Note : Assure-toi d'avoir ajouté la méthode 'findByUtilisateurId' dans ton Repository et Service
    /*
    @GetMapping("/user/{userId}")
    public ResponseEntity<Intervenant> getIntervenantByUserId(@PathVariable Long userId) {
        // Tu devras ajouter cette méthode dans ton Service si tu veux utiliser l'IntervenantPanel
        // return ResponseEntity.ok(intervenantService.findByUtilisateurId(userId));
        return ResponseEntity.notFound().build(); // Placeholder si pas encore implémenté
    }
    */
}