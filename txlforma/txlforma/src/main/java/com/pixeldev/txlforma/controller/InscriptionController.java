package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.dto.InscriptionRequest;
import com.pixeldev.txlforma.model.Inscription;
import com.pixeldev.txlforma.model.Emargement;
import com.pixeldev.txlforma.service.InscriptionService;
import com.pixeldev.txlforma.repository.InscriptionRepository;
import com.pixeldev.txlforma.repository.EmargementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "*")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private EmargementRepository emargementRepository;

    // --- 1. Endpoint pour l'étudiant : Signer l'émargement ---
    @PutMapping("/{id}/valider")
    public ResponseEntity<?> validerInscription(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return inscriptionRepository.findById(id).map(ins -> {
            // MODIFICATION ICI : On passe à "SIGNEE" (En attente de validation prof)
            ins.setStatutInscription("SIGNEE");
            inscriptionRepository.save(ins);

            // Création de l'émargement avec la signature
            try {
                Emargement emargement = new Emargement();
                emargement.setUtilisateur(ins.getUtilisateur());
                emargement.setSession(ins.getSession());
                emargement.setDate(LocalDate.now());

                String sig = (body != null) ? body.get("signature") : null;

                if (sig != null && !sig.isEmpty()) {
                    emargement.signer(sig);
                } else {
                    emargement.setStatut("ABSENT");
                }

                emargementRepository.save(emargement);
            } catch (Exception e) {
                System.err.println("Erreur emargement : " + e.getMessage());
            }

            return ResponseEntity.ok(ins);
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- 2. Endpoint pour l'intervenant : Récupérer la liste des élèves ---
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Inscription>> getInscriptionsBySession(@PathVariable Long sessionId) {
        // Assurez-vous que cette méthode existe dans votre InscriptionRepository !
        List<Inscription> list = inscriptionRepository.findBySessionId(sessionId);
        return ResponseEntity.ok(list);
    }

    // --- 3. Endpoint pour l'intervenant : Valider la présence finale ---
    @PutMapping("/{id}/valider-presence")
    public ResponseEntity<Inscription> validerPresence(@PathVariable Long id) {
        return inscriptionRepository.findById(id).map(inscription -> {
            inscription.setStatutInscription("VALIDEE"); // Le statut final (Vert)
            return ResponseEntity.ok(inscriptionRepository.save(inscription));
        }).orElseThrow(() -> new RuntimeException("Inscription non trouvée"));
    }

    // --- Endpoints existants inchangés ---

    @PostMapping("/participer")
    public ResponseEntity<?> participer(@RequestBody InscriptionRequest request) {
        try {
            Inscription inscription = inscriptionService.creerInscriptionAvecPaiement(
                    request.getUtilisateurId(),
                    request.getSessionId(),
                    request.getMontant(),
                    request.getMethode(),
                    request.getTransactionid(),
                    request.getReferenceTransaction(),
                    "CARTE"
            );
            return ResponseEntity.ok(inscription);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

    @PutMapping("/{id}/progression")
    public ResponseEntity<?> augmenterProgression(@PathVariable Long id) {
        try {
            Inscription ins = inscriptionService.avancerProgression(id);
            return ResponseEntity.ok(ins);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }
}