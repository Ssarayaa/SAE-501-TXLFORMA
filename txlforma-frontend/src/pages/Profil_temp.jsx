import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

// --- 1. FONCTION DE FORMATAGE (Pour enlever le "T") ---
const formaterDate = (dateString) => {
  if (!dateString) return "Date inconnue";
  const date = new Date(dateString);
  
  // Format : "6 janvier 2026 à 15h30"
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date).replace(':', 'h'); 
};

const styles = {
  page: { 
    backgroundColor: '#f1f5f9', 
    minHeight: '100vh', 
    width: '100%', 
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: '#1e293b',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden'
  },
  container: { 
    width: '100%', 
    padding: '40px 4%', 
    flex: 1,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  title: { fontSize: '1.75rem', fontWeight: '700', marginBottom: '30px', color: '#0f172a' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', width: '100%', alignItems: 'start' },
  card: { 
    backgroundColor: '#ffffff', borderRadius: '12px', padding: '28px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', 
    display: 'flex', flexDirection: 'column' 
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' },
  cardLabel: { fontSize: '0.85rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' },
  
  profileInfoSection: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', flexWrap: 'wrap' },
  avatarImg: { width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #edb92e', padding: '2px', objectFit: 'cover' },
  userName: { fontSize: '1.25rem', margin: 0, fontWeight: '700' },
  roleBadge: { background: '#f0f9ff', padding: '3px 10px', borderRadius: '4px', color: '#0077b6', fontWeight: '600', fontSize: '0.75rem' },
  contactList: { display: 'flex', flexDirection: 'column', gap: '18px' },
  infoRow: { display: 'flex', gap: '12px', alignItems: 'center' },
  infoText: { fontWeight: '500', margin: 0, fontSize: '0.9rem', wordBreak: 'break-all' },
  
  statsWrapper: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%' },
  statItem: { padding: '20px', borderRadius: '8px', background: '#f8fafc', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderLeftWidth: '4px', minWidth: 0 },
  statCount: { fontSize: '1.6rem', fontWeight: '800' },
  statLabelText: { fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '4px' },
  
  // Styles Table
  tableContainer: { marginTop: '30px', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  th: { textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' },
  td: { padding: '16px', borderBottom: '1px solid #f1f5f9', color: '#334155', verticalAlign: 'middle' },
  statusBadge: { padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' },

  // --- 2. STYLE DU FAUX BOUTON ---
  btnVisio: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '5px',
    backgroundColor: '#0077b6', // Bleu
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
};

const StatItem = ({ count, label, color }) => (
  <div style={{ ...styles.statItem, borderLeftColor: color }}>
    <p style={styles.statLabelText}>{label}</p>
    <span style={{ ...styles.statCount, color }}>{count}</span>
  </div>
);

const Profil = () => {
  const [stats, setStats] = useState({ formationsUniques: 0, terminees: 0, certificats: 0 });
  const [inscriptions, setInscriptions] = useState([]); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/api/utilisateurs/${user.id}/stats`)
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error(err));

      fetch(`http://localhost:8080/api/utilisateurs/${user.id}/inscriptions`)
        .then(res => res.json())
        .then(data => setInscriptions(data))
        .catch(err => console.error("Erreur chargement inscriptions:", err));
    }
  }, [user?.id]);

  if (!user) return <div style={{padding: '100px', textAlign: 'center'}}>Veuillez vous connecter.</div>;

  return (
    <div style={styles.page}>
      <main style={{ ...styles.container, padding: isMobile ? '20px 15px' : '40px 4%' }}>
        <h1 style={styles.title}>Mon Tableau de bord</h1>

        <div style={{ ...styles.mainGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
          
          {/* Carte Identité */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardLabel}>Identité & Contact</h3>
            </div>
            <div style={styles.profileInfoSection}>
              <img src="/src/assets/etudiants.png" alt="Avatar" style={styles.avatarImg} />
              <div>
                <h2 style={styles.userName}>{user.prenom} {user.nom}</h2>
                <span style={styles.roleBadge}>{user.role || 'PARTICIPANT'}</span>
              </div>
            </div>
            <div style={styles.contactList}>
              <div style={styles.infoRow}>
                <span> Adresse mail : </span>
                <div><p style={styles.infoText}>{user.email}</p></div>
              </div>
              <div style={styles.infoRow}>
                <span> Adresse : </span>
                <div><p style={styles.infoText}>{user.adresse_postale || 'Non renseigné'}</p></div>
              </div>
              <div style={styles.infoRow}>
                <span> Numéro de téléphone : </span>
                <div><p style={styles.infoText}>{user.telephone || 'Non renseigné'}</p></div>
              </div>
            </div>
          </div>

          {/* Carte Stats */}
          <div style={styles.card}>
            <div style={styles.cardHeader}><h3 style={styles.cardLabel}>Ma Progression</h3></div>
            <div style={{ ...styles.statsWrapper, gridTemplateColumns: isMobile && window.innerWidth < 500 ? '1fr' : '1fr 1fr' }}>
              <StatItem count={stats.formationsUniques} label="Formations suivies" color="#0077b6" />
              <StatItem count={inscriptions.length} label="Sessions prévues" color="#38bdf8" />
              <StatItem count={stats.terminees} label="Terminées" color="#edb92e" />
              <StatItem count={stats.certificats} label="Certifications" color="#f59e0b" />
            </div>
          </div>
        </div>

        {/* --- TABLEAU DÉTAILLÉ --- */}
        <div style={{ marginTop: '30px' }}>
            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h3 style={styles.cardLabel}>Mes sessions inscrites</h3>
                </div>
                
                {inscriptions.length === 0 ? (
                    <p style={{color: '#64748b', fontStyle: 'italic'}}>Aucune session prévue pour le moment.</p>
                ) : (
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Formation</th>
                                    <th style={styles.th}>Date Inscription</th>
                                    <th style={styles.th}>Distanciel</th>
                                    <th style={styles.th}>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inscriptions.map((ins, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>
                                            <strong style={{color: '#0f172a', fontSize: '1rem'}}>
                                              {ins.session?.formation?.titre || "Formation"}
                                            </strong>
                                            <div style={{marginTop: '4px', fontSize: '0.85rem', color: '#64748b'}}>
                                                Session #{ins.session?.id}
                                            </div>
                                        </td>
                                        
                                        <td style={styles.td}>
                                            <div style={{fontSize: '0.9rem', color: '#334155'}}>
                                              {/* --- UTILISATION DE LA FONCTION POUR ENLEVER LE "T" --- */}
                                              {formaterDate(ins.dateInscription)}
                                            </div>
                                        </td>
                                        
                                        <td style={styles.td}>
                                            
                                            {/* --- FAUX BOUTON VISIO --- */}
                                            <button 
                                                style={styles.btnVisio}
                                                onClick={() => alert("Redirection vers Zoom/Teams...")}
                                            >
                                                Rejoindre Visio
                                            </button>
                                        </td>
                                        
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.statusBadge,
                                                background: ins.statutInscription === 'VALIDEE' ? '#dcfce7' : '#fff7ed',
                                                color: ins.statutInscription === 'VALIDEE' ? '#166534' : '#c2410c'
                                            }}>
                                                {ins.statutInscription || "EN ATTENTE"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Profil;