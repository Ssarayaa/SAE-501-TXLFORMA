package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Emargement;
import com.pixeldev.txlforma.service.EmargementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/emargements")
@CrossOrigin(origins = "*")

public class EmargementController {

    private final EmargementService emargementService;

    @Autowired
    public EmargementController(EmargementService emargementService) {
        this.emargementService = emargementService;
    }


    @PostMapping
    public ResponseEntity<?> enregistrerPresence(
            @RequestParam Long utilisateurId,
            @RequestParam Long sessionId,
            @RequestParam LocalDate date) {
        try {
            Emargement emargement = emargementService.enregistrerPresence(utilisateurId, sessionId, date);
            return new ResponseEntity<>(emargement, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Emargement>> getEmargementBySession(@PathVariable Long sessionId) {
        List<Emargement> emargements = emargementService.findBySession(sessionId);
        return ResponseEntity.ok(emargements);
    }
}