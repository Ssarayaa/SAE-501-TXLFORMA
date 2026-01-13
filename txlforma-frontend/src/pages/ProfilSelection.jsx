import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IconStudent = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const IconTeacher = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const ProfilSelection = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (role) {
      navigate(`/login?role=${role}`);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body { overflow: hidden; } 
          .fade-in { animation: fadeIn 0.4s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
          
          .card-select { transition: all 0.2s ease; border: 1px solid #e2e8f0; }
          .card-select:hover { border-color: #0f172a; transform: translateY(-2px); }
          .active-student { border-color: #0284c7 !important; background-color: #f0f9ff !important; box-shadow: 0 0 0 1px #0284c7; }
          .active-teacher { border-color: #ca8a04 !important; background-color: #fefce8 !important; box-shadow: 0 0 0 1px #ca8a04; }
        `}
      </style>

      <div style={styles.mainCard} className="fade-in">
        
        {/* HEADER */}
        <div style={styles.header}>
          <img src="/src/assets/pixelform.png" alt="Logo" style={styles.logoImg} />
          <h1 style={styles.title}>Bienvenue sur PixelForm</h1>
          <p style={styles.subtitle}>Choisissez votre profil pour commencer</p>
        </div>

        {/* GRILLE DE CHOIX */}
        <div style={styles.gridContainer}>
          
          {/* CARTE ETUDIANT */}
          <div 
            onClick={() => setRole('PARTICIPANT')}
            className={`card-select ${role === 'PARTICIPANT' ? 'active-student' : ''}`}
            style={styles.choiceCard}
          >
            <div style={{...styles.iconBox, backgroundColor: '#0284c7'}}>
              <IconStudent />
            </div>
            <h3 style={styles.cardTitle}>Étudiant</h3>
            <p style={styles.cardText}>Je souhaite apprendre et suivre des formations.</p>
          </div>

          {/* CARTE FORMATEUR */}
          <div 
            onClick={() => setRole('INTERVENANT')}
            className={`card-select ${role === 'INTERVENANT' ? 'active-teacher' : ''}`}
            style={styles.choiceCard}
          >
            <div style={{...styles.iconBox, backgroundColor: '#ca8a04'}}>
              <IconTeacher />
            </div>
            <h3 style={styles.cardTitle}>Intervenant</h3>
            <p style={styles.cardText}>Je souhaite créer et partager mon savoir.</p>
          </div>

        </div>

        {/* BOUTON */}
        <button 
          onClick={handleContinue}
          disabled={!role}
          style={{
            ...styles.btn,
            opacity: role ? 1 : 0.5,
            cursor: role ? 'pointer' : 'not-allowed'
          }}
        >
          Continuer vers l'inscription
        </button>

        <p style={styles.footerText} onClick={() => navigate('/login')}>
          Déjà un compte ? <span style={styles.link}>Connexion</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    height: 'calc(100vh - 90px)',
    width: '100%',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', sans-serif"
  },
  mainCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
  },
  header: { textAlign: 'center', marginBottom: '30px' },
  
  logoImg: { height: '80px', marginBottom: '16px' },
  
  title: { fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' },
  subtitle: { fontSize: '12px', color: '#64748b', margin: 0 },
  
  gridContainer: { display: 'flex', gap: '16px', width: '100%', marginBottom: '30px' },
  
  choiceCard: {
    flex: 1,
    padding: '20px',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    backgroundColor: '#ffffff'
  },
  iconBox: {
    width: '40px', height: '40px', borderRadius: '50%', 
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', margin: '0 auto 12px auto'
  },
  cardTitle: { fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' },
  cardText: { fontSize: '11px', color: '#64748b', lineHeight: '1.4', margin: 0 },

  btn: {
    width: '100%', padding: '12px',
    backgroundColor: '#0f172a', color: '#fff',
    border: 'none', borderRadius: '6px',
    fontSize: '13px', fontWeight: '600', transition: 'all 0.2s'
  },
  footerText: { marginTop: '20px', fontSize: '11px', color: '#64748b', cursor: 'pointer' },
  link: { color: '#0f172a', fontWeight: '700', marginLeft: '4px' }
};

export default ProfilSelection;