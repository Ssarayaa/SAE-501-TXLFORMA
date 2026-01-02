package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "utilisateur")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String pseudo;
    private String telephone;
    private String entreprise;
    private String role;

    // En utilisant le même nom partout, on élimine les erreurs de mapping
    @Column(name = "adresse_postale")
    private String adresse_postale;
}