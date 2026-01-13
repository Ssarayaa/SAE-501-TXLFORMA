package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Emargement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmargementRepository extends JpaRepository<Emargement, Long> {

    Optional<Emargement> findByUtilisateurIdAndSessionIdAndDate(Long utilisateurId, Long sessionId, LocalDate date);

    List<Emargement> findBySessionId(Long sessionId);
}