package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    // AJOUT DE CETTE MÉTHODE POUR REMPLIR TON MENU DÉROULANT REACT
    @GetMapping("/all")
    public org.springframework.http.ResponseEntity<List<Utilisateur>> getAll() {
        return org.springframework.http.ResponseEntity.ok(utilisateurService.findAll());
    }

    @PostMapping("/inscription")
    public org.springframework.http.ResponseEntity<?> inscription(@RequestBody Utilisateur utilisateur) {
        if (utilisateurService.existsByEmail(utilisateur.getEmail())) {
            return org.springframework.http.ResponseEntity.status(HttpStatus.CONFLICT).body("Email déjà utilisé.");
        }
        if (utilisateur.getRole() == null || utilisateur.getRole().isEmpty()) {
            utilisateur.setRole("PARTICIPANT");
        }
        return org.springframework.http.ResponseEntity.ok(utilisateurService.save(utilisateur));
    }

    @PostMapping("/connexion")
    public org.springframework.http.ResponseEntity<?> connexion(@RequestBody Utilisateur loginData) {
        Utilisateur user = utilisateurService.findByEmail(loginData.getEmail());
        if (user != null) {
            if (user.getPassword().equals(loginData.getPassword()) || user.getPassword().equals("{noop}" + loginData.getPassword())) {
                return org.springframework.http.ResponseEntity.ok(user);
            }
        }
        return org.springframework.http.ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
    }
}