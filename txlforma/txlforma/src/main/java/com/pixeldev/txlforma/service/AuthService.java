package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur register(Utilisateur utilisateur) throws Exception {
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            throw new Exception("L'utilisateur avec cet email existe déjà.");
        }

        String hashedPassword = "{noop}" + utilisateur.getPassword();
        utilisateur.setPassword(hashedPassword);

        if (utilisateur.getRole() == null || utilisateur.getRole().isEmpty()) {
            utilisateur.setRole("PARTICIPANT");
        }

        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur login(String email, String rawPassword) throws Exception {
        Optional<Utilisateur> optionalUser = utilisateurRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new Exception("Identifiants invalides.");
        }

        Utilisateur utilisateur = optionalUser.get();

        if (!utilisateur.getPassword().equals("{noop}" + rawPassword)) {
            throw new Exception("Identifiants invalides.");
        }

        return utilisateur;
    }
}