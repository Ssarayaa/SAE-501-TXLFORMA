package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "contact")
@Data
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String message;
}