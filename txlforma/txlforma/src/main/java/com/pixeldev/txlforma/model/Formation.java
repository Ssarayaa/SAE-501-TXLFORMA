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

    @Column(length = 1000)
    private String description;

    private String duree;
    private String lieu;
    private Double prix;

    @ManyToOne
    @JoinColumn(name = "intervenant_id")
    private Intervenant intervenant;

    @JsonIgnore
    @OneToMany(mappedBy = "formation")
    private List<Session> sessions;

    public Formation(Long id) {
        this.id = id;
    }
}