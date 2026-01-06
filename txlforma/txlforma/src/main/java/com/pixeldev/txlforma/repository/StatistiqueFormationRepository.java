package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Statistiques;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatistiqueFormationRepository extends JpaRepository<Statistiques, Long> {
}