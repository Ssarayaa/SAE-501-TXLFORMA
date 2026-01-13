import React, { useEffect } from 'react';
import Footer from '../components/Footer';

const styles = {
  page: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    width: '100vw',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: '#1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden'
  },
  hero: {
    backgroundColor: '#005b96', 
    color: '#ffffff',
    padding: '80px 5% 120px 5%',
    textAlign: 'center',
    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
  },
  tagline: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '20px',
    display: 'block',
    opacity: 0.8,
    fontWeight: '500'
  },
  heroTitle: { 
    fontSize: '2.5rem', 
    fontWeight: '700', 
    margin: '0 0 20px 0',
    lineHeight: '1.2'
  },
  heroSubtitle: { 
    fontSize: '1.1rem', 
    opacity: 0.9, 
    maxWidth: '600px', 
    margin: '0 auto',
    lineHeight: '1.6',
    fontWeight: '300'
  },
  container: {
    width: '85%',
    maxWidth: '1000px',
    margin: '-60px auto 0 auto',
    paddingBottom: '100px',
    flex: 1
  },
  contentSection: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '50px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
    marginBottom: '60px'
  },
  sectionLabel: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#005b96',
    marginBottom: '25px',
    textAlign: 'center'
  },
  description: {
    fontSize: '1.05rem',
    lineHeight: '1.8',
    color: '#333',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    marginTop: '50px'
  },
  card: {
    textAlign: 'center',
    padding: '20px'
  },
  avatar: {
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    marginBottom: '20px',
    objectFit: 'cover',
    border: '1px solid #eee'
  },
  memberName: {
    fontSize: '1.15rem',
    fontWeight: '600',
    margin: '10px 0 5px 0',
    color: '#1a1a1a'
  },
  memberRole: {
    fontSize: '0.9rem',
    color: '#005b96',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  contextFooter: {
    marginTop: '80px',
    padding: '30px',
    borderTop: '1px solid #f0f0f0',
    textAlign: 'center'
  }
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <span style={styles.tagline}>Parcours Universitaire — SAE 501</span>
        <h1 style={styles.heroTitle}>Découvrir PixelForm</h1>
        <p style={styles.heroSubtitle}>
          Une plateforme pensée pour structurer l'apprentissage numérique, développée avec rigueur dans un cadre académique.
        </p>
      </header>

      <main style={styles.container}>
        <section style={styles.contentSection}>
          <h2 style={styles.sectionLabel}>L'essence du projet</h2>
          <p style={styles.description}>
            PixelForm est le résultat d'une réflexion sur l'ergonomie des outils pédagogiques actuels. 
            Notre démarche a consisté à concevoir un environnement fluide où la technologie s'efface au profit de la transmission du savoir. 
            Ce projet mobilise des compétences transversales, allant de la gestion de base de données à la création d'interfaces utilisateur immersives.
          </p>
        </section>

        <section>
          <h2 style={{...styles.sectionLabel, marginBottom: '40px'}}>Responsabilités de l'équipe</h2>
          <div style={styles.teamGrid}>
            {[
              { name: "Nicolas Buisset", role: "Responsable Front-end et de la 3D   ", img: "/src/assets/etudiants.png" },
              { name: "Sarah Zaiem", role: "Responsable Back-end et Cheffe de projet", img: "/src/assets/etudiants.png" },
              { name: "Thylia Brouillard", role: "Responsable du Design & du Figma", img: "/src/assets/etudiants.png" }
            ].map((member, index) => (
              <div key={index} style={styles.card}>
                <img src={member.img} alt={member.name} style={styles.avatar} />
                <h3 style={styles.memberName}>{member.name}</h3>
                <p style={styles.memberRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <footer style={styles.contextFooter}>
          <p style={{ fontSize: '0.9rem', color: '#777', fontStyle: 'italic', margin: 0 }}>
            Ce travail est une réalisation étudiante effectuée en 2026. L'ensemble des technologies utilisées, 
            incluant React et Spring Boot, servent de support à la validation de nos acquis universitaires.
          </p>
        </footer>
      </main>

      <Footer />
    </div>
  );
};

export default About;