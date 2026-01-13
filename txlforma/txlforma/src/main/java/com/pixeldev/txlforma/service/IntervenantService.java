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

    public Intervenant save(Intervenant intervenant) {
        return intervenantRepository.save(intervenant);
    }

    public List<Intervenant> findAll() {
        return intervenantRepository.findAll();
    }

    public Intervenant findById(Long id) {
        return intervenantRepository.findById(id).orElse(null);
    }

    public List<String> findDistinctSpecialites() {
        return intervenantRepository.findDistinctSpecialites();
    }
}