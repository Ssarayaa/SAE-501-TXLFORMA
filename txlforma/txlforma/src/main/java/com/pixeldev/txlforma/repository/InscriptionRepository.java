package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    // Vérifier si un utilisateur est déjà inscrit à une session spécifique
    Optional<Inscription> findByUtilisateurIdAndSessionId(Long utilisateurId, Long sessionId);

    // Compter le nombre total d'inscriptions d'un utilisateur
    long countByUtilisateurId(Long utilisateurId);

    // Compter les inscriptions selon leur statut (ex: "VALIDEE", "EN ATTENTE")
    long countByUtilisateurIdAndStatutInscription(Long utilisateurId, String statutInscription);

    // Compter le nombre de formations uniques suivies (statistique étudiant)
    @Query("SELECT COUNT(DISTINCT i.session.formation.id) FROM Inscription i WHERE i.utilisateur.id = :userId")
    long countDistinctFormationsByUtilisateurId(@Param("userId") Long userId);

    // Récupérer l'historique des inscriptions d'un élève
    List<Inscription> findByUtilisateurId(Long utilisateurId);

    // --- NOUVEAU : Récupérer la liste des élèves inscrits à une session (Pour l'intervenant) ---
    List<Inscription> findBySessionId(Long sessionId);
}