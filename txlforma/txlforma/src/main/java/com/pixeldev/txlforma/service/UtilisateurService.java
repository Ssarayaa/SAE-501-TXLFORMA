package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public Utilisateur save(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur findByEmail(String email) {
        return utilisateurRepository.findByEmail(email).orElse(null);
    }

    public boolean existsByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    public Utilisateur findById(Long id) throws Exception {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new Exception("Utilisateur introuvable"));
    }
}