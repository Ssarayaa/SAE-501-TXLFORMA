package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Paiement;
import com.pixeldev.txlforma.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaiementService {

    @Autowired
    private PaiementRepository paiementRepository;

    public List<Paiement> findAll() {
        return paiementRepository.findAll();
    }

    public Paiement save(Paiement paiement) {
        return paiementRepository.save(paiement);
    }

    public Paiement findById(Long id) {
        return paiementRepository.findById(id).orElse(null);
    }
}