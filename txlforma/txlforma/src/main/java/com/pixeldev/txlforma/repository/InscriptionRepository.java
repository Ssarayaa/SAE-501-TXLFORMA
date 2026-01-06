package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List; // Import List
import java.util.Optional;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    Optional<Inscription> findByUtilisateurIdAndSessionId(Long utilisateurId, Long sessionId);

    long countByUtilisateurId(Long utilisateurId);

    long countByUtilisateurIdAndStatutInscription(Long utilisateurId, String statutInscription);

    @Query("SELECT COUNT(DISTINCT i.session.formation.id) FROM Inscription i WHERE i.utilisateur.id = :userId")
    long countDistinctFormationsByUtilisateurId(@Param("userId") Long userId);

    // --- AJOUT : Récupérer la liste des inscriptions (avec les détails Session/Formation) ---
    List<Inscription> findByUtilisateurId(Long utilisateurId);
}