package com.pixeldev.txlforma.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Intervenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialite;
    private String statut;
    private Integer heuresRealisees;

    @OneToMany(mappedBy = "intervenant")
    @JsonIgnore
    private List<Session> sessions;

    // Constructeur manuel pour Jackson
    public Intervenant(Long id) {
        this.id = id;
    }
}