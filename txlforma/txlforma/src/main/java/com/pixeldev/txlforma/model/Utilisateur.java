package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

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

    @Column(name = "adresse_postale")
    private String adresse_postale;

    // --- AJOUT DE SECURITÉ ---
    // On ajoute la relation inverse avec @JsonIgnore pour éviter
    // que Java ne boucle à l'infini lors de la récupération des données.
    @OneToMany(mappedBy = "utilisateur")
    @JsonIgnore
    private List<Inscription> inscriptions;
}