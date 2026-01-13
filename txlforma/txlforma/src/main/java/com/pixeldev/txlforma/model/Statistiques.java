package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "statistiques")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Statistiques {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String periode;
    private int nbParticipants;
    private float tauxReussite;
    private float chiffreAffaire;
}

