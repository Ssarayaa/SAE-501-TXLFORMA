package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/inscription")
    public ResponseEntity<?> inscription(@RequestBody Utilisateur utilisateur) {
        // 1. Bloquer la création si l'email existe déjà
        if (utilisateurService.existsByEmail(utilisateur.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Cet email est déjà utilisé par un autre compte.");
        }

        // 2. Assigner un rôle par défaut si vide
        if (utilisateur.getRole() == null || utilisateur.getRole().isEmpty()) {
            utilisateur.setRole("PARTICIPANT");
        }

        // 3. Sauvegarder
        Utilisateur savedUser = utilisateurService.save(utilisateur);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/connexion")
    public ResponseEntity<?> connexion(@RequestBody Utilisateur loginData) {
        Utilisateur user = utilisateurService.findByEmail(loginData.getEmail());

        if (user != null) {
            String dbPassword = user.getPassword(); // Récupère ex: {noop}pass
            String inputPassword = loginData.getPassword(); // Récupère ex: pass

            // Compare avec ou sans le préfixe {noop}
            if (dbPassword.equals(inputPassword) || dbPassword.equals("{noop}" + inputPassword)) {
                return ResponseEntity.ok(user);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
    }
}