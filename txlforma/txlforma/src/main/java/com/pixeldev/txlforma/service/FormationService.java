package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Formation;
import com.pixeldev.txlforma.model.Session;
import com.pixeldev.txlforma.repository.FormationRepository;
import com.pixeldev.txlforma.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FormationService {

    @Autowired private FormationRepository formationRepository;
    @Autowired private SessionRepository sessionRepository;

    public Formation creerFormation(Formation formation) {
        return formationRepository.save(formation);
    }

    public List<Formation> findAll() {
        return formationRepository.findAll();
    }

    public Formation findById(Long id) throws Exception {
        return formationRepository.findById(id)
                .orElseThrow(() -> new Exception("Formation introuvable."));
    }

    @Transactional
    public Session ajouterSessionAFormation(Long formationId, Session nouvelleSession) throws Exception {
        Formation formation = findById(formationId);

        nouvelleSession.setFormation(formation);
        nouvelleSession.setEtat("PLANIFIEE");

        return sessionRepository.save(nouvelleSession);
    }
}