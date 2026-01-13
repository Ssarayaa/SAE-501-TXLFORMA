import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const styles = {
  page: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    backgroundColor: '#0077b6',
    color: '#ffffff',
    padding: '60px 5% 120px 5%',
    textAlign: 'center',
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)', 
    marginBottom: '20px'
  },
  container: {
    width: '90%',
    maxWidth: '650px',
    margin: '-80px auto 100px auto', 
    zIndex: 10,
    position: 'relative'
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  inputGroup: { marginBottom: '20px' },
  label: { 
    display: 'block', 
    fontSize: '0.9rem', 
    fontWeight: '600', 
    marginBottom: '8px', 
    color: '#334155' 
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    color: '#1e293b', 
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'all 0.2s'
  },
  button: {
    backgroundColor: '#0077b6',
    color: '#fff',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%'
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({ nom: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Message envoyé !");
        setFormData({ nom: '', email: '', message: '' });
      }
    } catch (error) {
      alert("Impossible de contacter le serveur. Est-il lancé sur le port 8080 ?");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <h1 style={{ fontSize: '2.2rem' }}>Contact</h1>
        <p>Une équipe à votre écoute pour vos projets numériques.</p>
      </header>

      <main style={styles.container}>
        <div style={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nom complet</label>
              <input 
                style={styles.input}
                className="input-focus"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Adresse e-mail</label>
              <input 
                type="email" 
                style={styles.input}
                className="input-focus"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea 
                style={{...styles.input, minHeight: '120px'}}
                className="input-focus"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>
            <button type="submit" style={styles.button} disabled={isSending}>
              {isSending ? "Transmission en cours..." : "Envoyer le message"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <style>{`
        .input-focus:focus { 
          border-color: #0077b6 !important; 
          color: #000000 !important; /* Force le texte en noir au focus */
          background-color: #f8fafc !important;
        }
      `}</style>
    </div>
  );
};

export default Contact;