package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);

    // Vérifie si l'email existe déjà dans la table utilisateur
    boolean existsByEmail(String email);
}