import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const styles = {
  page: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    width: '100%',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: '#2d3436',
    display: 'flex',
    flexDirection: 'column',
  },
  headerSection: {
    backgroundColor: '#0077b6',
    color: '#fff',
    padding: '60px 4%',
    marginBottom: '40px',
    animation: 'fadeInDown 0.8s ease-out'
  },
  headerTitle: { fontSize: '2.5rem', fontWeight: '800', margin: 0 },
  headerSubtitle: { fontSize: '1.1rem', opacity: 0.9, marginTop: '10px' },
  container: {
    width: '94%',
    maxWidth: '900px',
    margin: '0 auto',
    flex: 1,
    paddingBottom: '60px'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '1px solid #edf2f7',
    marginBottom: '30px'
  },
  sectionHeader: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: '20px',
    borderBottom: '2px solid #f1c40f',
    paddingBottom: '10px',
    display: 'inline-block'
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#4a5568',
    marginBottom: '20px'
  },
  codeBlock: {
    backgroundColor: '#2d3436',
    color: '#dfe6e9',
    padding: '20px',
    borderRadius: '8px',
    fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
    fontSize: '0.95rem',
    marginBottom: '25px',
    borderLeft: '5px solid #f1c40f'
  },
  btnValidate: {
    display: 'block',
    width: '100%',
    padding: '18px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#0077b6',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '30px'
  }
};

const CoursDev = () => {
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
        alert("Une erreur est survenue lors de la validation du cours.");
      }
    } catch (err) {
      console.error("Erreur connexion API:", err);
      alert("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.headerSection}>
        <h1 style={styles.headerTitle}>Développement Web</h1>
        <p style={styles.headerSubtitle}>Module Avancé : La gestion d'état avec React</p>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.sectionHeader}>Le Hook useState</h2>
          
          <p style={styles.text}>
            Dans le développement moderne avec React, la gestion de l'état local est primordiale. 
            Le Hook <strong>useState</strong> est la fonction fondamentale qui permet à un composant fonctionnel de conserver des informations entre deux affichages.
          </p>

          <div style={styles.codeBlock}>
            const [compteur, setCompteur] = useState(0);
          </div>

          <p style={styles.text}>
            Cette syntaxe utilise la déstructuration de tableau. Le premier élément (<code>compteur</code>) représente la valeur actuelle de l'état. 
            Le second élément (<code>setCompteur</code>) est la fonction qui permet de mettre à jour cette valeur et de déclencher un nouveau rendu du composant.
          </p>

          <h3 style={{...styles.sectionHeader, fontSize: '1.2rem', marginTop: '20px'}}>Points Clés</h3>
          <ul style={{...styles.text, paddingLeft: '20px'}}>
            <li>Ne jamais appeler un Hook à l'intérieur d'une boucle ou d'une condition.</li>
            <li>Toujours déclarer les Hooks au niveau supérieur de votre fonction React.</li>
            <li>La mise à jour de l'état peut être asynchrone.</li>
          </ul>

          <button 
            onClick={handleNextLesson} 
            disabled={loading}
            style={{
              ...styles.btnValidate,
              backgroundColor: loading ? '#94a3b8' : '#0077b6',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#005a8d')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#0077b6')}
          >
            {loading ? "Validation en cours..." : "Valider ce module et continuer"}
          </button>
        </div>
      </main>
      
      <Footer />
      <style>{`@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default CoursDev;