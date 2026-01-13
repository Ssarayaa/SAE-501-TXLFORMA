package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Emargement;
import com.pixeldev.txlforma.service.EmargementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emargements")
@CrossOrigin(origins = "http://localhost:5173")
public class EmargementController {

    @Autowired
    private EmargementService emargementService;

    // POST pour enregistrer une présence manuellement (Admin/Intervenant)
    @PostMapping("/enregistrer")
    public ResponseEntity<?> enregistrer(@RequestBody Map<String, Object> payload) {
        try {
            // Conversion sécurisée des types
            Long utilisateurId = Long.valueOf(payload.get("utilisateurId").toString());
            Long sessionId = Long.valueOf(payload.get("sessionId").toString());

            // Si la date n'est pas fournie, on prend aujourd'hui
            LocalDate date = payload.containsKey("date")
                    ? LocalDate.parse(payload.get("date").toString())
                    : LocalDate.now();

            Emargement e = emargementService.enregistrerPresence(utilisateurId, sessionId, date);
            return ResponseEntity.ok(e);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/session/{sessionId}")
    public List<Emargement> getBySession(@PathVariable Long sessionId) {
        return emargementService.findBySession(sessionId);
    }

    // Endpoint pour la signature directe du participant (si utilisé)
    @PostMapping("/signer")
    public ResponseEntity<?> signerMaPresence(@RequestBody Map<String, Long> payload) {
        try {
            Emargement e = emargementService.signerMaPresence(
                    payload.get("utilisateurId"),
                    payload.get("sessionId")
            );
            return ResponseEntity.ok(e);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}