package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Inscription;
import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.repository.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private UtilisateurService utilisateurService;

    @Transactional
    public Inscription inscrireUtilisateur(Long utilisateurId, Long sessionId) throws Exception {
        // La ligne ci-dessous ne sera plus en rouge après avoir corrigé UtilisateurService
        Utilisateur utilisateur = utilisateurService.findById(utilisateurId);

        // Logique de création de l'inscription à compléter...
        return null;
    }

    // Ajoute cette méthode pour PaiementService
    public Inscription findById(Long id) throws Exception {
        return inscriptionRepository.findById(id)
                .orElseThrow(() -> new Exception("Inscription introuvable"));
    }
}