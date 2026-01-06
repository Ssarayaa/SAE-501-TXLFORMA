package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.dto.InscriptionRequest;
import com.pixeldev.txlforma.model.Inscription;
import com.pixeldev.txlforma.service.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "http://localhost:5173") // Indispensable pour React
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    // --- C'EST CETTE MÉTHODE QUI MANQUAIT POUR LE PAIEMENT ---
    @PostMapping("/participer")
    public ResponseEntity<?> participer(@RequestBody InscriptionRequest request) {
        try {
            // On appelle le service avec les données reçues du React
            // Note: On passe "CARTE" par défaut pour moyenPaiement si non fourni
            Inscription inscription = inscriptionService.creerInscriptionAvecPaiement(
                    request.getUtilisateurId(),
                    request.getSessionId(),
                    request.getMontant(),
                    request.getMethode(),
                    request.getTransactionid(),
                    request.getReferenceTransaction(),
                    "CARTE"
            );
            return ResponseEntity.ok(inscription);
        } catch (Exception e) {
            e.printStackTrace(); // Affiche l'erreur dans la console IntelliJ
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }
    // ---------------------------------------------------------

    // Méthode pour la progression (Cours)
    @PutMapping("/{id}/progression")
    public ResponseEntity<?> augmenterProgression(@PathVariable Long id) {
        try {
            Inscription ins = inscriptionService.avancerProgression(id);
            return ResponseEntity.ok(ins);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }
}