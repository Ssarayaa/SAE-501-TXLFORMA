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

    // --- MODIFICATION POUR LE NOUVEAU DASHBOARD ---
    public Map<String, Long> getStatistiquesByUtilisateurId(Long id) {
        Map<String, Long> stats = new HashMap<>();

        // 1. "Sessions Prévues" (Anciennement basé sur "en cours", maintenant total des sessions)
        // L'utilisateur voulait : "base sur le back end des sessions" (donc total inscriptions sessions)
        long totalSessions = inscriptionRepository.countByUtilisateurId(id);
        stats.put("sessionsPrévues", totalSessions);

        // 2. "Formations Suivies" (Basé sur formations uniques, max 3)
        long nbFormationsUniques = inscriptionRepository.countDistinctFormationsByUtilisateurId(id);
        // On applique la limite de 3 (si nb > 3, on affiche 3, sinon on affiche le nombre réel)
        stats.put("formationsUniques", Math.min(nbFormationsUniques, 3));

        // 3. Les autres stats inchangées
        stats.put("terminées", inscriptionRepository.countByUtilisateurIdAndStatutInscription(id, "VALIDEE"));
        stats.put("certificats", inscriptionRepository.countByUtilisateurIdAndStatutInscription(id, "CERTIFIEE"));

        return stats;
    }

    // ... Le reste du fichier (save, findByEmail, etc.) reste inchangé ...
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