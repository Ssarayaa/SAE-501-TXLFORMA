package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Inscription;
import com.pixeldev.txlforma.service.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    // Route pour le Participant (avec paiement)
    @PostMapping("/participer")
    public ResponseEntity<?> inscrireAvecPaiement(@RequestBody Map<String, Object> payload) {
        try {
            Long userId = Long.valueOf(payload.get("utilisateurId").toString());
            Long sessionId = Long.valueOf(payload.get("sessionId").toString());
            Double montant = Double.valueOf(payload.get("montant").toString());

            Inscription ins = inscriptionService.creerInscriptionAvecPaiement(userId, sessionId, montant);
            return ResponseEntity.ok(ins);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Route conservée si besoin pour d'autres usages internes
    @PostMapping("/add")
    public ResponseEntity<?> inscrireManuellement(@RequestBody Map<String, Long> payload) {
        try {
            Long userId = payload.get("utilisateurId");
            Long sessionId = payload.get("sessionId");
            return ResponseEntity.ok(inscriptionService.inscrireManuellement(userId, sessionId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}