package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Formation;
import com.pixeldev.txlforma.service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formations")
@CrossOrigin(origins = "*")

public class FormationController {

    private final FormationService formationService;

    @Autowired
    public FormationController(FormationService formationService) {
        this.formationService = formationService;
    }

    @PostMapping("/add")
    public org.springframework.http.ResponseEntity<Formation> add(@RequestBody Formation formation) {
        try {
            Formation nouvelle = formationService.creerFormation(formation);
            return org.springframework.http.ResponseEntity.status(HttpStatus.CREATED).body(nouvelle);
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public org.springframework.http.ResponseEntity<List<Formation>> getAll() {
        try {
            List<Formation> formations = formationService.findAll();
            return org.springframework.http.ResponseEntity.ok(formations);
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public org.springframework.http.ResponseEntity<Formation> getById(@PathVariable Long id) {
        try {
            Formation formation = formationService.findById(id);
            return org.springframework.http.ResponseEntity.ok(formation);
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}