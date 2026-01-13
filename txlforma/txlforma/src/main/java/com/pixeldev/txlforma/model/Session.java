package com.pixeldev.txlforma.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private LocalDateTime dateDebut;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime dateFin;

    private int nbPlaces = 12;
    private String etat = "PLANIFIEE";
    private String lieu;


    private String lienVisio = "https://meet.google.com/abc-defg-hij";

    private Double prix;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "formation_id", nullable = false)
    @JsonIgnoreProperties({"sessions", "inscriptions"})
    private Formation formation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "intervenant_id")
    @JsonIgnoreProperties("sessions")
    private Intervenant intervenant;

    @JsonIgnore
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<Inscription> inscriptions = new ArrayList<>();

    public Session(Long id) {
        this.id = id;
    }
}