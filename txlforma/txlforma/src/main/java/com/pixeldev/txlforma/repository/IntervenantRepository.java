package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Intervenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntervenantRepository extends JpaRepository<Intervenant, Long> {
}