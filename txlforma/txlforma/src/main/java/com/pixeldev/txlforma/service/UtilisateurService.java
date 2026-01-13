package com.pixeldev.txlforma.service;

import com.pixeldev.txlforma.model.Utilisateur;
import com.pixeldev.txlforma.repository.UtilisateurRepository;
import com.pixeldev.txlforma.repository.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public Map<String, Long> getStatistiquesByUtilisateurId(Long id) {
        Map<String, Long> stats = new HashMap<>();


        long totalSessions = inscriptionRepository.countByUtilisateurId(id);
        stats.put("sessionsPrévues", totalSessions);

        long nbFormationsUniques = inscriptionRepository.countDistinctFormationsByUtilisateurId(id);
        stats.put("formationsUniques", Math.min(nbFormationsUniques, 3));

        stats.put("terminées", inscriptionRepository.countByUtilisateurIdAndStatutInscription(id, "VALIDEE"));
        stats.put("certificats", inscriptionRepository.countByUtilisateurIdAndStatutInscription(id, "CERTIFIEE"));

        return stats;
    }

    public Utilisateur save(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur findByEmail(String email) {
        return utilisateurRepository.findByEmail(email).orElse(null);
    }

    public boolean existsByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    public Utilisateur findById(Long id) throws Exception {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new Exception("Utilisateur introuvable"));
    }

    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }
}