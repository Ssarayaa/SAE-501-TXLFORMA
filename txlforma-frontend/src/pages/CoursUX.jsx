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
  highlightBox: { backgroundColor: '#f0f9ff', borderLeft: '5px solid #0077b6', padding: '20px', borderRadius: '4px', marginBottom: '25px' },
  btnValidate: { display: 'block', width: '100%', padding: '18px', borderRadius: '10px', border: 'none', backgroundColor: '#0077b6', color: '#fff', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', transition: 'background-color 0.3s ease', marginTop: '30px' }
};

const CoursUX = () => {
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
        alert("Erreur lors de la mise à jour de la progression.");
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
        <h1 style={styles.headerTitle}>Design UI/UX</h1>
        <p style={styles.headerSubtitle}>Ergonomie et psychologie cognitive</p>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.sectionHeader}>La Loi de Fitts</h2>
          
          <p style={styles.text}>
            La loi de Fitts est un modèle prédictif du mouvement humain utilisé en ergonomie et en interaction homme-machine. 
            Elle établit que le temps requis pour atteindre rapidement une cible dépend du rapport entre la distance à parcourir et la taille de la cible.
          </p>

          <div style={styles.highlightBox}>
            <strong>Application pratique :</strong> Plus un élément interactif (bouton, lien) est petit et éloigné du curseur (ou du doigt), plus il sera difficile et long à atteindre pour l'utilisateur.
          </div>

          <h3 style={{...styles.sectionHeader, fontSize: '1.2rem', marginTop: '10px'}}>Conséquences pour le Design Mobile</h3>
          <p style={styles.text}>
            Sur les interfaces tactiles, cela signifie que les éléments importants doivent être suffisamment larges et placés dans la zone de confort du pouce. 
            Une zone tactile minimale de 44x44 pixels est recommandée par les guidelines iOS et Android.
          </p>

          <button 
            onClick={handleNextLesson} 
            disabled={loading}
            style={{...styles.btnValidate, backgroundColor: loading ? '#94a3b8' : '#0077b6'}}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#005a8d')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#0077b6')}
          >
            {loading ? "Traitement..." : "Terminer la leçon"}
          </button>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default CoursUX;