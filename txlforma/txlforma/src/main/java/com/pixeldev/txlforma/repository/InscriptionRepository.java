package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // IMPORTANT : Ajoutez l'import

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    // NOUVELLE MÉTHODE : Nécessaire pour la vérification dans InscriptionService
    Optional<Inscription> findByUtilisateurIdAndSessionId(Long utilisateurId, Long sessionId);
}