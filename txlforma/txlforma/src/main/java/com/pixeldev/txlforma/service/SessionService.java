package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Session;
import com.pixeldev.txlforma.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public List<Session> findAll() {
        return sessionRepository.findAll();
    }

    public Session findById(Long id) throws Exception {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new Exception("Session introuvable avec l'ID: " + id));
    }

    public Session save(Session session) {
        return sessionRepository.save(session);
    }

}