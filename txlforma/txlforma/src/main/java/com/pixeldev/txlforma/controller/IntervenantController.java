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
@CrossOrigin(origins = "*")
public class IntervenantController {

    private final IntervenantService intervenantService;

    @Autowired
    public IntervenantController(IntervenantService intervenantService) {
        this.intervenantService = intervenantService;
    }

    // Ajout de "/add" pour correspondre à ton fetch React
    @PostMapping("/add")
    public ResponseEntity<Intervenant> createIntervenant(@RequestBody Intervenant intervenant) {
        Intervenant nouveau = intervenantService.save(intervenant);
        return new ResponseEntity<>(nouveau, HttpStatus.CREATED);
    }

    @GetMapping("/all") // J'ai ajouté /all pour être cohérent avec tes formations
    public ResponseEntity<List<Intervenant>> getAllIntervenants() {
        List<Intervenant> intervenants = intervenantService.findAll();
        return ResponseEntity.ok(intervenants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Intervenant> getIntervenantById(@PathVariable Long id) {
        try {
            Intervenant intervenant = intervenantService.findById(id);
            return ResponseEntity.ok(intervenant);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}