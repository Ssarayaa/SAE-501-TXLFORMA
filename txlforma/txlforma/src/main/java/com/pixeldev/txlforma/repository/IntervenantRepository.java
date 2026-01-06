package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Intervenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface IntervenantRepository extends JpaRepository<Intervenant, Long> {

    // Pour trouver un intervenant via son compte utilisateur
    Optional<Intervenant> findByUtilisateurId(Long utilisateurId);

    // --- NOUVEAU : Récupérer les spécialités uniques ---
    @Query("SELECT DISTINCT i.specialite FROM Intervenant i WHERE i.specialite IS NOT NULL AND i.specialite <> ''")
    List<String> findDistinctSpecialites();
}