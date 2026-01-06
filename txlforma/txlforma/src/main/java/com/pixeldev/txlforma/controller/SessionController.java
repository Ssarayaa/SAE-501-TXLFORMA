package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Session;
import com.pixeldev.txlforma.repository.SessionRepository;
import com.pixeldev.txlforma.model.Formation;
import com.pixeldev.txlforma.model.Intervenant;
import com.pixeldev.txlforma.repository.FormationRepository;
import com.pixeldev.txlforma.repository.IntervenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")

public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private IntervenantRepository intervenantRepository;

    @GetMapping
    public List<Session> getAll() {
        return sessionRepository.findAll();
    }

    @GetMapping("/all")
    public List<Session> getAllAlias() {
        return sessionRepository.findAll();
    }

    // NOUVEAU : Récupérer les sessions pour une formation spécifique
    @GetMapping("/formation/{id}")
    public List<Session> getByFormation(@PathVariable Long id) {
        return sessionRepository.findByFormationId(id);
    }

    @PostMapping
    public Session create(@RequestBody Session session) {
        if (session.getFormation() != null && session.getFormation().getId() != null) {
            Formation f = formationRepository.findById(session.getFormation().getId()).orElse(null);
            session.setFormation(f);
        }

        if (session.getIntervenant() != null && session.getIntervenant().getId() != null) {
            Intervenant i = intervenantRepository.findById(session.getIntervenant().getId()).orElse(null);
            session.setIntervenant(i);
        }

        return sessionRepository.save(session);
    }
}