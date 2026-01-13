package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur newUser = authService.register(utilisateur);
            newUser.setPassword(null);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utilisateur loginRequest) {
        try {
            Utilisateur utilisateur = authService.login(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );

            utilisateur.setPassword(null);
            return ResponseEntity.ok(utilisateur);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Déconnexion réussie.");
    }
}