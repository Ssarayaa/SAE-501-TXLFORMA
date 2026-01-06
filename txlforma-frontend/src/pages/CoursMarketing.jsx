import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const styles = {
  page: { backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#2d3436', display: 'flex', flexDirection: 'column' },
  headerSection: { backgroundColor: '#0077b6', color: '#fff', padding: '60px 4%', marginBottom: '40px', animation: 'fadeInDown 0.8s ease-out' },
  headerTitle: { fontSize: '2.5rem', fontWeight: '800', margin: 0 },
  headerSubtitle: { fontSize: '1.1rem', opacity: 0.9, marginTop: '10px' },
  container: { width: '94%', maxWidth: '900px', margin: '0 auto', flex: 1, paddingBottom: '60px' },
  card: { backgroundColor: '#fff', borderRadius: '15px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', marginBottom: '30px' },
  sectionHeader: { fontSize: '1.5rem', fontWeight: '700', color: '#0077b6', marginBottom: '20px', borderBottom: '2px solid #f1c40f', paddingBottom: '10px', display: 'inline-block' },
  text: { fontSize: '1rem', lineHeight: '1.8', color: '#4a5568', marginBottom: '20px' },
  gridPillars: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px', marginBottom: '30px' },
  pillarCard: { backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' },
  pillarTitle: { color: '#0077b6', fontWeight: '700', marginBottom: '10px', display: 'block' },
  btnValidate: { display: 'block', width: '100%', padding: '18px', borderRadius: '10px', border: 'none', backgroundColor: '#0077b6', color: '#fff', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', transition: 'background-color 0.3s ease', marginTop: '30px' }
};

const CoursMarketing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNextLesson = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/inscriptions/${id}/progression`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        navigate('/mes-formations');
      } else {
        alert("Erreur technique lors de la validation.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.headerSection}>
        <h1 style={styles.headerTitle}>Stratégie Marketing</h1>
        <p style={styles.headerSubtitle}>Optimisation pour les moteurs de recherche (SEO)</p>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.sectionHeader}>Les Piliers du SEO</h2>
          
          <p style={styles.text}>
            Le référencement naturel (SEO) ne repose pas sur une seule astuce, mais sur une stratégie globale. 
            Pour être visible durablement sur Google, il est impératif de travailler simultanément sur trois axes fondamentaux.
          </p>

          <div style={styles.gridPillars}>
            <div style={styles.pillarCard}>
              <span style={styles.pillarTitle}>1. La Technique</span>
              <p style={{margin: 0, fontSize: '0.9rem', color: '#64748b'}}>
                Structure du site, vitesse de chargement, compatibilité mobile et sécurité (HTTPS). C'est la fondation de votre visibilité.
              </p>
            </div>
            <div style={styles.pillarCard}>
              <span style={styles.pillarTitle}>2. Le Contenu</span>
              <p style={{margin: 0, fontSize: '0.9rem', color: '#64748b'}}>
                Répondre aux intentions de recherche des utilisateurs. Utilisation pertinente des mots-clés et richesse sémantique.
              </p>
            </div>
            <div style={styles.pillarCard}>
              <span style={styles.pillarTitle}>3. L'Autorité</span>
              <p style={{margin: 0, fontSize: '0.9rem', color: '#64748b'}}>
                La popularité de votre site aux yeux des moteurs, mesurée principalement par les liens entrants (backlinks) de qualité.
              </p>
            </div>
          </div>

          <button 
            onClick={handleNextLesson} 
            disabled={loading}
            style={{...styles.btnValidate, backgroundColor: loading ? '#94a3b8' : '#0077b6'}}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#005a8d')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#0077b6')}
          >
            {loading ? "Mise à jour..." : "Valider le module SEO"}
          </button>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default CoursMarketing;