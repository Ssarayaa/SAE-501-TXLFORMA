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
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String categorie;
    private String description;
    private String duree;
    private String lieu;
    private Double prix;

    @OneToMany(mappedBy = "formation")
    @JsonIgnore
    private List<Session> sessions;
}