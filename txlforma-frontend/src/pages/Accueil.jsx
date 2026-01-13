import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePublic = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);

  const getDomainImage = (titre) => {
    const t = titre.toLowerCase();
    if (t.includes('développement') || t.includes('web')) return '/src/assets/devweb.png';
    if (t.includes('design') || t.includes('ux')) return '/src/assets/design.png';
    if (t.includes('marketing')) return '/src/assets/marketing.jpg';
    return '/src/assets/devweb.png'; 
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/formations/all')
      .then(res => res.json())
      .then(data => setFormations(data.slice(0, 3)))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  return (
    <div style={styles.page}>
      {/* --- SECTION HERO --- */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Développez vos compétences avec PixelForm</h1>
          <p style={styles.heroSubtitle}>
            Des formations en ligne de qualité pour booster votre carrière professionnelle.
          </p>
          <button onClick={() => navigate('/choix-profil')} style={styles.btnExplore}>
            Explorez nos formations
          </button>
        </div>
        <div style={styles.heroImageContainer}>
          <img src="/src/assets/ordi.png" alt="PixelForm" style={styles.heroImage} />
        </div>
      </section>

      {/* --- SECTION STATISTIQUES --- */}
      <section style={styles.statsSection}>
        <div style={styles.statBox}><div style={styles.statIcon}></div><h2 style={styles.statNumber}>150 +</h2><p style={styles.statLabel}>Formations</p></div>
        <div style={styles.statBox}><div style={styles.statIcon}></div><h2 style={styles.statNumber}>5000 +</h2><p style={styles.statLabel}>Etudiants</p></div>
        <div style={styles.statBox}><div style={styles.statIcon}></div><h2 style={styles.statNumber}>95%</h2><p style={styles.statLabel}>Satisfaction</p></div>
        <div style={styles.statBox}><div style={styles.statIcon}></div><h2 style={styles.statNumber}>4.78/5</h2><p style={styles.statLabel}>Note moyenne</p></div>
      </section>

      {/* --- SECTION CATALOGUE --- */}
      <section style={styles.catalogSection}>
        <h2 style={styles.sectionTitle}>Quelques une de nos formations</h2>
        <div style={styles.grid}>
          {formations.map((f) => (
            <div key={f.id} style={styles.card}>
              <div style={styles.cardImageContainer}>
                <img src={getDomainImage(f.titre)} alt={f.titre} style={styles.cardImage} />
              </div>
              <div style={styles.cardContent}>
                <h4 style={styles.cardTitle}>{f.titre}</h4>
                <p style={styles.cardDesc}>
                  {f.description ? f.description.substring(0, 100) : "Apprenez les bases de ce domaine avec nos experts..."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

const styles = {
  page: { fontFamily: 'Segoe UI, sans-serif', color: '#333', backgroundColor: '#fff', width: '100%', overflowX: 'hidden' },
  hero: { background: '#0077b6', color: 'white', display: 'flex', padding: '100px 10%', alignItems: 'center', justifyContent: 'space-between' },
  heroContent: { flex: 1, paddingRight: '50px' },
  heroTitle: { fontSize: '3.8rem', marginBottom: '20px', lineHeight: '1.1', fontWeight: 'bold' },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '30px', opacity: '0.9' },
  btnExplore: { background: '#f1c40f', border: 'none', padding: '15px 35px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', color: '#2c3e50' },
  heroImageContainer: { flex: 1, display: 'flex', justifyContent: 'center' },
  heroImage: { width: '100%', maxWidth: '480px' },
  
  statsSection: { display: 'flex', justifyContent: 'space-around', padding: '60px 10%', background: '#fff', borderBottom: '1px solid #eee' },
  statBox: { textAlign: 'center' },
  statIcon: { fontSize: '2.5rem', color: '#0077b6', marginBottom: '10px' },
  statNumber: { fontSize: '2.2rem', margin: '0', fontWeight: 'bold' },
  statLabel: { color: '#777', marginTop: '5px', fontSize: '1.1rem' },

  catalogSection: { padding: '80px 10%', backgroundColor: '#f8f9fa' },
  sectionTitle: { fontSize: '2.2rem', marginBottom: '50px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' },
  card: { background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' },
  cardImageContainer: { height: '220px', width: '100%', overflow: 'hidden' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  cardContent: { padding: '25px' },
  cardTitle: { fontSize: '1.4rem', margin: '0 0 12px 0', color: '#0077b6', fontWeight: 'bold' },
  cardDesc: { fontSize: '0.95rem', color: '#666', lineHeight: '1.5' },

  footer: { background: '#0077b6', color: 'white', padding: '60px 10%', borderTop: '1px solid rgba(255,255,255,0.1)' },
  footerGrid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '30px' },
  footerCol: { display: 'flex', flexDirection: 'column' },
  footerLogoContainer: { marginBottom: '10px' },
  footerLogoImg: { height: '80px', width: 'auto', filter: 'brightness(0) invert(1)' },
  footerBrandText: { fontSize: '0.95rem', lineHeight: '1.4', marginBottom: '20px', opacity: '1', fontWeight: '500' },
  socialIcons: { display: 'flex', gap: '15px' },
  socialImg: { width: '45px', height: '45px', objectFit: 'contain', cursor: 'pointer', padding: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' },
  footerTitle: { fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '25px' },
  footerLink: { fontSize: '0.95rem', marginBottom: '15px', opacity: '0.9', cursor: 'pointer' },
};

export default HomePublic;