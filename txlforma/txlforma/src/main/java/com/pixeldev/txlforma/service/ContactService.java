package com.pixeldev.txlforma.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String nom, String email, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("pixelform-noreply@votre-domaine.com");
        mail.setTo("sarahayazaiem@gmail.com");
        mail.setSubject("Nouveau message de contact : " + nom);
        mail.setText("De : " + nom + " (" + email + ")\n\nMessage :\n" + message);

        mailSender.send(mail);
    }
}