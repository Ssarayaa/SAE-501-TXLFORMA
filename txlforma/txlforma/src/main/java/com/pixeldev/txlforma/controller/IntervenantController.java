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

    @PostMapping("/add")
    public ResponseEntity<Intervenant> createIntervenant(@RequestBody Intervenant intervenant) {
        Intervenant nouveau = intervenantService.save(intervenant);
        return new ResponseEntity<>(nouveau, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Intervenant>> getAllIntervenants() {
        List<Intervenant> intervenants = intervenantService.findAll();
        return ResponseEntity.ok(intervenants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Intervenant> getIntervenantById(@PathVariable Long id) {
        Intervenant intervenant = intervenantService.findById(id);
        if (intervenant != null) {
            return ResponseEntity.ok(intervenant);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/specialites")
    public ResponseEntity<List<String>> getSpecialites() {
        return ResponseEntity.ok(intervenantService.findDistinctSpecialites());
    }

}