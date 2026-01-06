package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Intervenant;
import com.pixeldev.txlforma.repository.IntervenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IntervenantService {

    @Autowired
    private IntervenantRepository intervenantRepository;

    // Enregistrer ou mettre à jour un intervenant
    public Intervenant save(Intervenant intervenant) {
        return intervenantRepository.save(intervenant);
    }

    // Récupérer tous les intervenants
    public List<Intervenant> findAll() {
        return intervenantRepository.findAll();
    }

    // Récupérer un intervenant par son ID
    public Intervenant findById(Long id) {
        return intervenantRepository.findById(id).orElse(null);
    }

    // Récupérer les spécialités uniques pour l'auto-complétion
    public List<String> findDistinctSpecialites() {
        return intervenantRepository.findDistinctSpecialites();
    }
}