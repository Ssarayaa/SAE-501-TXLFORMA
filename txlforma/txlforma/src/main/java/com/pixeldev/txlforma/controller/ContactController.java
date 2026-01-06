package com.pixeldev.txlforma.controller;

import com.pixeldev.txlforma.model.Contact;
import com.pixeldev.txlforma.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/contact")
    public ResponseEntity<?> handleContact(@RequestBody Map<String, String> data) {
        try {
            // 1. Création de l'objet Contact
            Contact nouveauMessage = new Contact();
            nouveauMessage.setNom(data.get("nom"));
            nouveauMessage.setEmail(data.get("email"));
            nouveauMessage.setMessage(data.get("message"));

            // 2. Sauvegarde en base de données MySQL
            contactRepository.save(nouveauMessage);

            return ResponseEntity.ok().body(Map.of("message", "Message sauvegardé en base !"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Erreur lors de la sauvegarde"));
        }
    }
}