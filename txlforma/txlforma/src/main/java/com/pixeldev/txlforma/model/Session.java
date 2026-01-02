package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "session_formation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "date_debut")
    private LocalDateTime dateDebut;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "date_fin")
    private LocalDateTime dateFin;

    @Column(name = "nb_places")
    private int nbPlaces = 12;

    private String etat = "planifiée";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "formation_id", nullable = false)
    private Formation formation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "intervenant_id")
    private Intervenant intervenant;

    @JsonIgnoreProperties("session")
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<Inscription> inscriptions = new ArrayList<>();
}