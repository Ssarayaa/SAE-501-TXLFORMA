import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

// --- COMPOSANTS UI ---
const CustomAlert = ({ isOpen, message, type, onClose }) => {
  if (!isOpen) return null;
  const isError = type === 'error';
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalBox}>
        <div style={{ ...styles.modalHeader, backgroundColor: isError ? '#e74c3c' : '#005a8d' }}>
          {isError ? 'Information' : 'Notification'}
        </div>
        <div style={styles.modalBody}>
          <p style={styles.modalText}>{message}</p>
          <button onClick={onClose} style={styles.modalBtn}>OK</button>
        </div>
      </div>
    </div>
  );
};

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#005a8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const VerifiedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#005a8d" style={{ marginLeft: '6px', verticalAlign: 'middle' }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

function ParticipantCatalog() {
  // --- STATES ---
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [paymentStep, setPaymentStep] = useState(null);
  const [alert, setAlert] = useState({ isOpen: false, message: '', type: 'success' });
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvc: '', pays: 'France' });

  // RECUPERATION USER POUR L'AFFICHAGE CONDITIONNEL
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isIntervenant = user?.role === 'INTERVENANT';

  // --- HELPERS ---
  const showAlert = (message, type = 'success') => {
    setAlert({ isOpen: true, message, type });
  };

  const closeAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  const getDomainImage = (titre) => {
    const t = titre.toLowerCase();
    if (t.includes('développement') || t.includes('web')) return '/src/assets/devweb.png';
    if (t.includes('design') || t.includes('ux')) return '/src/assets/design.png';
    if (t.includes('marketing')) return '/src/assets/marketing.jpg';
    if (t.includes('3d')) return '/src/assets/3d.png';
    return '/src/assets/devweb.png';
  };

  const formatHeure = (dateString) => {
    if (!dateString) return "--h--";
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
  };

  // --- CHARGEMENT ---
  useEffect(() => {
    fetch('http://localhost:8080/api/formations/all')
      .then(res => res.json())
      .then(data => {
        setFormations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => console.error("Erreur formations:", err));
  }, []);

  const handleSelectFormation = async (formation) => {
    try {
      const res = await fetch(`http://localhost:8080/api/sessions/formation/${formation.id}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        setSelectedFormation(formation);
        setPaymentStep(null);
        window.scrollTo(0, 0);
      }
    } catch (err) {
      showAlert("Erreur lors de la récupération des sessions", "error");
    }
  };

  // --- ACTIONS DE PAIEMENT ---
  const startPayment = (sessionId, prix) => {
    // Sécurité supplémentaire : si un intervenant force le clic
    if (isIntervenant) {
      return;
    }

    if (prix === null || prix === undefined) {
      console.warn("Prix session introuvable, utilisation du prix par défaut");
    }
    setPaymentStep({ sessionId, prix });
    window.scrollTo(0, 200);
  };

  const handlePayerEtInscrireFinal = async () => {
    if (!user) return showAlert("Veuillez vous connecter !", "error");
    if (isIntervenant) return showAlert("Action non autorisée pour un formateur.", "error");

    const refTransac = "TXN-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    const payload = {
      utilisateurId: user.id,
      sessionId: paymentStep.sessionId,
      montant: paymentStep.prix,
      methode: "CARTE_BANCAIRE",
      transactionid: "TID-" + Date.now(),
      referenceTransaction: refTransac
    };

    try {
      const res = await fetch('http://localhost:8080/api/inscriptions/participer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setPaymentStep(null);
        setCardInfo({ number: '', expiry: '', cvc: '', pays: 'France' });
        showAlert(`Paiement de ${paymentStep.prix}€ validé. Votre inscription est confirmée !`);
      } else {
        showAlert("Erreur lors de l'enregistrement du paiement.", "error");
      }
    } catch (error) {
      showAlert("Erreur réseau (vérifiez votre serveur backend)", "error");
    }
  };

  if (loading) return <div style={styles.loading}>Chargement du catalogue...</div>;

  const intervenantRef = sessions.length > 0 ? sessions[0].intervenant : null;

  return (
    <div style={styles.page}>
      <CustomAlert isOpen={alert.isOpen} message={alert.message} type={alert.type} onClose={closeAlert} />

      <header style={styles.headerBanner}>
        <div style={styles.headerContent}>
          {!selectedFormation ? (
            <>
              <h1 style={styles.bannerTitle}>Catalogue de Formations</h1>
              <p style={styles.bannerSubtitle}>Découvrez nos programmes d'excellence en distanciel.</p>
            </>
          ) : (
            <>
              <button onClick={() => { setSelectedFormation(null); setPaymentStep(null); }} style={styles.btnBack}>← Retour</button>
              <h1 style={styles.bannerTitle}>{selectedFormation.titre}</h1>
              <p style={styles.bannerSubtitle}>
                {selectedFormation.categorie} • {selectedFormation.duree} heures • Accès immédiat
              </p>
            </>
          )}
        </div>
      </header>

      <main style={styles.mainContent}>
        {!selectedFormation ? (
          <div style={styles.grid}>
            {formations.map(f => (
              <div key={f.id} style={styles.card}>
                <div style={styles.cardImageContainer}>
                  <img src={getDomainImage(f.titre)} alt={f.titre} style={styles.cardImage} />
                  <div style={styles.priceBadge}>{f.prix}€</div>
                </div>
                <div style={styles.cardBody}>
                  <span style={styles.categoryLabel}>{f.categorie}</span>
                  <h3 style={styles.cardTitle}>{f.titre}</h3>
                  <button onClick={() => handleSelectFormation(f)} style={styles.btnSelect}>Découvrir</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.detailLayout}>
            <div style={styles.detailMain}>

              {paymentStep ? (
                <section style={styles.paymentForm}>
                  <h2 style={styles.sectionTitle}>Paiement sécurisé par Carte</h2>
                  <div style={styles.cardPreview}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={styles.label}>Pays / Région</label>
                      <select
                        style={styles.input}
                        value={cardInfo.pays}
                        onChange={(e) => setCardInfo({ ...cardInfo, pays: e.target.value })}
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={styles.label}>Numéro de carte</label>
                      <input type="text" placeholder="4242 4242 4242 4242" style={styles.input}
                        value={cardInfo.number} onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={styles.label}>Expiration</label>
                        <input type="text" placeholder="MM/YY" style={styles.input}
                          value={cardInfo.expiry} onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={styles.label}>CVC</label>
                        <input type="text" placeholder="123" style={styles.input}
                          value={cardInfo.cvc} onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })} />
                      </div>
                    </div>
                  </div>
                  <p style={styles.paymentNote}>Montant à débiter : <strong>{paymentStep.prix}€</strong></p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setPaymentStep(null)} style={styles.btnCancel}>Annuler</button>
                    <button onClick={handlePayerEtInscrireFinal} style={styles.btnConfirmPayment}>Confirmer le paiement</button>
                  </div>
                </section>
              ) : (
                <>
                  <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Description du cursus</h2>
                    <p style={styles.textBlock}>{selectedFormation.description}</p>
                  </section>

                  <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Sessions disponibles</h2>
                    <div style={styles.sessionTimeline}>
                      {sessions.map(s => (
                        <div key={s.id} style={styles.sessionItem}>
                          <div style={styles.sessionTimeInfo}>
                            <div style={styles.sessionDateBadge}>{new Date(s.dateDebut).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }).toUpperCase()}</div>
                            <div style={styles.sessionHours}>{formatHeure(s.dateDebut)}</div>
                          </div>
                          <div style={styles.sessionBody}>
                            <div style={styles.sessionStatus}><span style={styles.statusDot}></span>Formation en ligne</div>
                            <div style={styles.sessionPlacesText}>{s.nbPlaces} places restantes</div>

                            <div style={{ fontWeight: 'bold', color: '#005a8d', fontSize: '0.9rem', marginTop: '4px' }}>
                              {s.prix ? `${s.prix}€` : "Inclus dans le pack"}
                            </div>
                          </div>

                          {/* BOUTON DÉSACTIVÉ POUR INTERVENANT */}
                          <button
                            onClick={() => startPayment(s.id, s.prix)}
                            style={isIntervenant ? styles.btnSmallDisabled : (s.nbPlaces > 0 ? styles.btnSmallInscrire : styles.btnSmallComplet)}
                            disabled={s.nbPlaces <= 0 || isIntervenant}
                            title={isIntervenant ? "Les formateurs ne peuvent pas s'inscrire" : ""}
                          >
                            {isIntervenant ? "Mode Formateur" : (s.nbPlaces > 0 ? `Réserver` : "Complet")}
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            <aside style={styles.sidebar}>
              <div style={styles.stickyContainer}>

                <div style={styles.sideCard}>
                  <h3 style={styles.sideCardTitle}>Pack Formation</h3>
                  <div style={styles.sidePrice}>{selectedFormation.prix}€</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#2d3748', fontWeight: '600' }}>
                    <span>Durée totale : {selectedFormation.duree} heures</span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>Accès complet à toutes les ressources et certification.</p>

                  {/* BOUTON DÉSACTIVÉ POUR INTERVENANT */}
                  <button
                    onClick={() => startPayment(sessions[0]?.id, selectedFormation.prix)}
                    style={isIntervenant ? styles.btnFullDisabled : styles.btnFullAction}
                    disabled={isIntervenant}
                  >
                    {isIntervenant ? "Inscription impossible (Formateur)" : "S'inscrire au cursus"}
                  </button>
                </div>

                {intervenantRef && (
                  <div style={styles.sideCard}>
                    <h3 style={styles.sideCardTitle}>Formateur Responsable</h3>

                    <div style={styles.instructorProfile}>
                      <div style={styles.instructorAvatar}>
                        <UserIcon />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={styles.instructorName}>
                          {intervenantRef.utilisateur
                            ? `${intervenantRef.utilisateur.prenom} ${intervenantRef.utilisateur.nom}`
                            : "Expert certifié"}
                          <VerifiedIcon />
                        </div>
                        <div style={styles.instructorRole}>
                          {intervenantRef.specialite}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  paymentForm: { background: '#ffffff', padding: '30px', borderRadius: '10px', border: '2px solid #005a8d' },
  cardPreview: { background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #edf2f7', marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: '#718096', marginBottom: '5px', textTransform: 'uppercase' },
  input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: '#fff', outline: 'none', color: '#000' },
  paymentNote: { marginBottom: '20px', fontSize: '1rem', color: '#2d3748' },
  btnConfirmPayment: { flex: 2, background: '#005a8d', color: 'white', border: 'none', padding: '15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  btnCancel: { flex: 1, background: '#f1f5f9', color: '#4a5568', border: 'none', padding: '15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 },
  modalBox: { width: '350px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', border: '1px solid #ddd' },
  modalHeader: { padding: '12px 20px', color: 'white', fontWeight: 'bold', fontSize: '1rem' },
  modalBody: { padding: '20px', textAlign: 'center' },
  modalText: { marginBottom: '20px', color: '#333', lineHeight: '1.4', fontSize: '0.95rem' },
  modalBtn: { padding: '8px 25px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  page: { backgroundColor: '#f8fafc', minHeight: '100vh', width: '100vw' },
  headerBanner: { background: '#005a8d', color: '#ffffff', padding: '40px 0' },
  headerContent: { maxWidth: '1200px', margin: '0 auto', padding: '0 5%' },
  bannerTitle: { fontSize: '2rem', fontWeight: '800', margin: 0 },
  bannerSubtitle: { fontSize: '1rem', marginTop: '5px', opacity: 0.8 },
  btnBack: { background: 'none', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', marginBottom: '15px' },
  mainContent: { maxWidth: '1200px', margin: '0 auto', padding: '30px 5%' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  card: { background: 'white', borderRadius: '10px', overflow: 'hidden', border: '1px solid #edf2f7', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  cardImageContainer: { height: '150px', position: 'relative' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  priceBadge: { position: 'absolute', bottom: '10px', right: '10px', background: '#005a8d', color: 'white', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' },
  cardBody: { padding: '15px' },
  categoryLabel: { color: '#005a8d', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase' },
  cardTitle: { fontSize: '1.1rem', color: '#1a202c', margin: '5px 0 15px 0' },
  btnSelect: { width: '100%', background: '#f8fafc', color: '#005a8d', border: '1px solid #005a8d', padding: '8px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  detailLayout: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' },
  detailMain: { display: 'flex', flexDirection: 'column', gap: '20px' },
  section: { background: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #edf2f7' },
  sectionTitle: { color: '#1a202c', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '700' },
  textBlock: { lineHeight: '1.6', color: '#4a5568', fontSize: '0.95rem' },
  sessionTimeline: { display: 'flex', flexDirection: 'column' },
  sessionItem: { display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f1f5f9' },
  sessionTimeInfo: { width: '100px' },
  sessionDateBadge: { background: '#f1f5f9', color: '#005a8d', padding: '3px', borderRadius: '4px', fontWeight: '800', fontSize: '0.8rem', textAlign: 'center' },
  sessionHours: { fontSize: '0.75rem', color: '#718096', textAlign: 'center' },
  sessionBody: { flex: 1, paddingLeft: '20px' },
  sessionStatus: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', color: '#2d3748' },
  statusDot: { width: '6px', height: '6px', background: '#48bb78', borderRadius: '50%' },
  sessionPlacesText: { fontSize: '0.8rem', color: '#718096' },

  // NOUVEAUX STYLES POUR BOUTONS DÉSACTIVÉS
  btnSmallInscrire: { background: '#005a8d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  btnSmallComplet: { background: '#edf2f7', color: '#a0aec0', border: 'none', padding: '8px 15px', borderRadius: '5px' },
  btnSmallDisabled: { background: '#e2e8f0', color: '#64748b', border: '1px solid #cbd5e1', padding: '8px 15px', borderRadius: '5px', cursor: 'not-allowed', fontWeight: '600' },

  sidebar: { position: 'relative' },
  stickyContainer: { position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '15px' },

  sideCard: { background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #edf2f7' },
  sideCardTitle: { fontSize: '1rem', color: '#1a202c', fontWeight: '700', margin: '0 0 15px 0' },
  sidePrice: { fontSize: '2rem', fontWeight: '900', color: '#005a8d', margin: '10px 0' },

  btnFullAction: { width: '100%', background: '#005a8d', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  btnFullDisabled: { width: '100%', background: '#e2e8f0', color: '#64748b', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'not-allowed' },

  loading: { textAlign: 'center', padding: '50px', color: '#005a8d' },

  instructorProfile: { display: 'flex', alignItems: 'center', gap: '15px' },
  instructorAvatar: { width: '50px', height: '50px', borderRadius: '50%', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0f2fe' },
  instructorName: { fontWeight: '700', color: '#2d3748', fontSize: '1rem', lineHeight: '1.2', display: 'flex', alignItems: 'center' },
  instructorRole: { fontSize: '0.85rem', color: '#718096', marginTop: '2px' },
};

export default ParticipantCatalog;