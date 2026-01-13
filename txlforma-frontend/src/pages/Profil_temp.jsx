import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';

// --- JEU D'ICÔNES SVG ---
const Icons = {
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  MapPin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  Briefcase: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  BookOpen: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  Grid: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  Alert: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  Pen: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
};

// --- UTILITAIRE DATE ---
const formaterDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date).replace(':', 'h');
};

const Profil = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isIntervenant = user?.role === 'INTERVENANT';

  // --- STATES ---
  const [activeTab, setActiveTab] = useState('profil');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // --- Données ---
  const [agenda, setAgenda] = useState([]);
  const [stats, setStats] = useState({ formationsUniques: 0, terminees: 0, certificats: 0 });
  const [currentIntervenant, setCurrentIntervenant] = useState(null);
  const [allFormations, setAllFormations] = useState([]);
  const [myCreatedFormations, setMyCreatedFormations] = useState([]);

  // États Émargement (Intervenant)
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [sessionStudents, setSessionStudents] = useState([]);

  // États Signature (Étudiant)
  const [showSignModal, setShowSignModal] = useState(false);
  const [selectedInsId, setSelectedInsId] = useState(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Formulaires
  const [formationData, setFormationData] = useState({ titre: '', categorie: '', description: '', duree: '', lieu: '', prix: '' });

  // --- STATE SESSION (Remplacé par la version fonctionnelle) ---
  const [sessionForm, setSessionForm] = useState({
    date: '',
    heureDebut: '',
    heureFin: '',
    nbPlaces: 12,
    formationId: '',
    prix: ''
  });

  useEffect(() => {
    if (user?.id) refreshData();
    else setLoading(false);
  }, [user?.id]);

  const refreshData = async () => {
    try {
      setLoading(true);
      if (isIntervenant) {
        // Intervenant Logic
        const resI = await fetch('http://localhost:8080/api/intervenants/all');
        let myId = null;
        if (resI.ok) {
          const all = await resI.json();
          const me = all.find(i => i.utilisateur && String(i.utilisateur.id) === String(user.id));
          if (me) {
            setCurrentIntervenant(me);
            myId = me.id;
          }
        }
        const resF = await fetch('http://localhost:8080/api/formations/all');
        if (resF.ok) {
          const formations = await resF.json();
          setAllFormations(formations);
          if (myId) setMyCreatedFormations(formations.filter(f => f.intervenant && String(f.intervenant.id) === String(myId)));
        }
        const resS = await fetch('http://localhost:8080/api/sessions/all');
        if (resS.ok && myId) {
          const allSessions = await resS.json();
          const mySessions = allSessions.filter(s => s.intervenant && String(s.intervenant.id) === String(myId));
          setAgenda(mySessions.sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut)));
        }
      } else {
        // Étudiant Logic
        const resIns = await fetch(`http://localhost:8080/api/utilisateurs/${user.id}/inscriptions`);
        if (resIns.ok) {
          const data = await resIns.json();
          // Mappage important : on garde l'ID de l'inscription pour la signature
          const formatted = data.map(ins => ({
            ...ins.session,
            inscriptionId: ins.id,
            statutInscription: ins.statutInscription
          }));
          setAgenda(formatted.sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut)));
        }
        const resStats = await fetch(`http://localhost:8080/api/utilisateurs/${user.id}/stats`);
        if (resStats.ok) setStats(await resStats.json());
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // --- LOGIQUE INTERVENANT : EMARGEMENT ---
  const handleSelectSessionForEmargement = async (sessionId) => {
    setSelectedSessionId(sessionId);
    if (!sessionId) { setSessionStudents([]); return; }
    try {
      const res = await fetch(`http://localhost:8080/api/inscriptions/session/${sessionId}`);
      if (res.ok) setSessionStudents(await res.json());
    } catch (err) { showNotif("Erreur chargement liste", "error"); }
  };

  const validateStudentPresence = async (inscriptionId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/inscriptions/${inscriptionId}/valider-presence`, { method: 'PUT' });
      if (res.ok) {
        showNotif("Présence validée !", "success");
        handleSelectSessionForEmargement(selectedSessionId); // Actualiser la liste
      } else showNotif("Erreur validation", "error");
    } catch (err) { showNotif("Erreur serveur", "error"); }
  };

  // --- LOGIQUE ETUDIANT : SIGNATURE ---
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const submitSignature = async () => {
    if (!canvasRef.current) return;
    try {
      const signatureImage = canvasRef.current.toDataURL("image/png");
      const res = await fetch(`http://localhost:8080/api/inscriptions/${selectedInsId}/valider`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ signature: signatureImage })
      });
      if (res.ok) {
        showNotif("Signature envoyée !", "success");
        setShowSignModal(false);
        refreshData();
      } else showNotif("Erreur envoi", "error");
    } catch (err) { showNotif("Erreur serveur", "error"); }
  };

  // --- ACTIONS CREATION ---
  const handleCreateFormation = async (e) => {
    e.preventDefault();
    const payload = { ...formationData, prix: parseFloat(formationData.prix), intervenant: { id: currentIntervenant.id } };
    try {
      const res = await fetch('http://localhost:8080/api/formations/add', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotif("Formation ajoutée !", "success");
        setFormationData({ titre: '', categorie: '', description: '', duree: '', lieu: '', prix: '' });
        refreshData();
      } else showNotif("Erreur création", "error");
    } catch (err) { showNotif("Erreur réseau", "error"); }
  };

  // --- HANDLER SESSION (Remplacé par la version fonctionnelle) ---
  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!currentIntervenant) return showNotif("Erreur profil", "error");

    // Validation
    if (!sessionForm.date || !sessionForm.heureDebut || !sessionForm.heureFin || !sessionForm.formationId) {
      return showNotif("Veuillez remplir tous les champs obligatoires", "error");
    }

    // Formatage YYYY-MM-DDTHH:mm (SANS SECONDES, pour éviter l'erreur index 16)
    const startISO = `${sessionForm.date}T${sessionForm.heureDebut}`;
    const endISO = `${sessionForm.date}T${sessionForm.heureFin}`;

    const payload = {
      dateDebut: startISO,
      dateFin: endISO,
      nbPlaces: parseInt(sessionForm.nbPlaces, 10),
      etat: "PLANIFIEE",
      formation: { id: parseInt(sessionForm.formationId, 10) },
      intervenant: { id: currentIntervenant.id },
      prix: sessionForm.prix ? parseFloat(sessionForm.prix) : null
    };

    try {
      const res = await fetch('http://localhost:8080/api/sessions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotif("Session publiée !", "success");
        setSessionForm({ date: '', heureDebut: '', heureFin: '', nbPlaces: 12, formationId: '', prix: '' });
        refreshData();
      } else {
        const txt = await res.text();
        console.error("Erreur Backend:", txt);
        showNotif("Erreur planification (Vérifiez les dates)", "error");
      }
    } catch (err) { showNotif("Erreur réseau", "error"); }
  };

  const showNotif = (msg, type) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // HELPERS BADGES
  const getStatusBadge = (status) => {
    switch (status) {
      case 'VALIDEE': return { label: 'PRÉSENCE VALIDÉE', bg: '#dcfce7', color: '#166534' };
      case 'SIGNEE': return { label: 'EN ATTENTE VALIDATION', bg: '#fef9c3', color: '#854d0e' };
      default: return { label: 'NON SIGNÉ', bg: '#fee2e2', color: '#991b1b' };
    }
  };

  if (!user) return <div style={styles.centerMsg}>Veuillez vous connecter.</div>;
  if (loading) return <div style={styles.centerMsg}>Chargement...</div>;

  return (
    <div style={styles.page}>

      {notification && (
        <div style={{ ...styles.notification, borderLeftColor: notification.type === 'success' ? '#10b981' : '#ef4444' }}>
          {notification.type === 'success' ? <Icons.Check /> : <Icons.Alert />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* MODALE SIGNATURE (POUR ETUDIANT) */}
      {showSignModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Signature Émargement</h3>
            <p style={styles.modalSub}>Signez dans le cadre ci-dessous.</p>
            <div style={styles.canvasContainer}>
              <canvas ref={canvasRef} width={320} height={150} style={styles.canvas}
                onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} onMouseLeave={() => setIsDrawing(false)}
                onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)}
              />
            </div>
            <div style={styles.modalActions}>
              <button onClick={clearCanvas} style={styles.btnSecondary}><Icons.Trash /> Effacer</button>
              <div style={{ flex: 1 }}></div>
              <button onClick={() => setShowSignModal(false)} style={styles.btnCancel}>Annuler</button>
              <button onClick={submitSignature} style={styles.btnPrimary}>Valider</button>
            </div>
          </div>
        </div>
      )}

      <main style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.avatarContainer}>
              <div style={styles.avatar}>{user.prenom.charAt(0)}{user.nom.charAt(0)}</div>
              {isIntervenant && <div style={styles.statusDot}></div>}
            </div>
            <div style={styles.userInfo}>
              <h1 style={styles.userName}>{user.prenom} {user.nom}</h1>
              <div style={styles.roleWrapper}>
                <span style={styles.roleBadge}>{isIntervenant ? "Formateur" : "Apprenant"}</span>
                {currentIntervenant && <span style={styles.specBadge}>{currentIntervenant.specialite}</span>}
              </div>
            </div>
          </div>
          <div style={styles.contactGrid}>
            <div style={styles.contactItem}><Icons.Mail /> {user.email}</div>
            <div style={styles.contactItem}><Icons.Phone /> {user.telephone || "Non renseigné"}</div>
            <div style={styles.contactItem}><Icons.MapPin /> {user.adresse_postale || "Non renseignée"}</div>
          </div>
        </header>

        <nav style={styles.tabsNav}>
          <button onClick={() => setActiveTab('profil')} style={activeTab === 'profil' ? styles.tabActive : styles.tab}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Grid /> Tableau de bord</div></button>
          {isIntervenant && (
            <>
              <button onClick={() => setActiveTab('formations')} style={activeTab === 'formations' ? styles.tabActive : styles.tab}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.BookOpen /> Formations</div></button>
              <button onClick={() => setActiveTab('sessions')} style={activeTab === 'sessions' ? styles.tabActive : styles.tab}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Calendar /> Sessions</div></button>
              <button onClick={() => setActiveTab('emargement')} style={activeTab === 'emargement' ? styles.tabActive : styles.tab}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Check /> Émargement</div></button>
            </>
          )}
        </nav>

        <div style={styles.contentArea}>

          {/* DASHBOARD */}
          {activeTab === 'profil' && (
            <div style={styles.dashboardGrid}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Statistiques</h3>
                <div style={styles.statsRow}>
                  {!isIntervenant ? (
                    <>
                      <div style={styles.statItem}><span style={styles.statVal}>{stats.formationsUniques}</span><span style={styles.statLabel}>Formations</span></div>
                      <div style={styles.statItem}><span style={styles.statVal}>{stats.certificats}</span><span style={styles.statLabel}>Certificats</span></div>
                    </>
                  ) : (
                    <>
                      <div style={styles.statItem}><span style={styles.statVal}>{myCreatedFormations.length}</span><span style={styles.statLabel}>Formations créées</span></div>
                      <div style={styles.statItem}><span style={styles.statVal}>{agenda.length}</span><span style={styles.statLabel}>Sessions actives</span></div>
                    </>
                  )}
                </div>
              </div>
              <div style={styles.cardLarge}>
                <h3 style={styles.cardTitle}>Agenda</h3>
                {agenda.length === 0 ? <div style={styles.emptyState}>Aucun événement.</div> : (
                  <div style={styles.listContainer}>
                    {agenda.map((s, i) => {
                      const badge = getStatusBadge(s.statutInscription);
                      return (
                        <div key={i} style={styles.listItem}>
                          <div style={styles.dateBadge}>
                            <span style={styles.day}>{new Date(s.dateDebut).getDate()}</span>
                            <span style={styles.month}>{new Date(s.dateDebut).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                          </div>
                          <div style={styles.itemMain}>
                            <span style={styles.itemTitle}>{s.formation?.titre}</span>
                            <span style={styles.itemSub}><Icons.Clock /> {formaterDate(s.dateDebut)} - {formaterDate(s.dateFin)}</span>
                          </div>
                          <div style={styles.itemRight}>
                            {!isIntervenant ? (
                              <>
                                <span style={{ ...styles.statusTag, background: badge.bg, color: badge.color }}>{badge.label}</span>
                                {/* CONDITION POUR AFFICHER LE BOUTON SI NON VALIDÉ/NON SIGNÉ */}
                                {(s.statutInscription !== 'VALIDEE' && s.statutInscription !== 'SIGNEE') && (
                                  <button onClick={() => { setSelectedInsId(s.inscriptionId); setShowSignModal(true); }} style={styles.btnSign}><Icons.Pen /> Signer</button>
                                )}
                              </>
                            ) : (
                              <span style={styles.statusTag}>ANIMATEUR</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FORMATIONS */}
          {isIntervenant && activeTab === 'formations' && (
            <div style={styles.gridSplit}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Mon Catalogue</h3>
                {myCreatedFormations.length === 0 ? <div style={styles.emptyState}>Vide.</div> : (
                  <div style={styles.compactList}>
                    {myCreatedFormations.map(f => (
                      <div key={f.id} style={styles.compactItem}>
                        <span style={{ fontWeight: '600', color: '#334155' }}>{f.titre}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{f.categorie}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={styles.cardForm}>
                <h3 style={styles.cardTitle}>Nouvelle Formation</h3>
                <form onSubmit={handleCreateFormation} style={styles.form}>
                  <div style={styles.formGroup}><label style={styles.label}>Titre</label><input required style={styles.input} value={formationData.titre} onChange={e => setFormationData({ ...formationData, titre: e.target.value })} /></div>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}><label style={styles.label}>Catégorie</label><input required style={styles.input} value={formationData.categorie} onChange={e => setFormationData({ ...formationData, categorie: e.target.value })} /></div>
                    <div style={styles.formGroup}><label style={styles.label}>Durée</label><input required style={styles.input} value={formationData.duree} onChange={e => setFormationData({ ...formationData, duree: e.target.value })} /></div>
                  </div>
                  <div style={styles.formGroup}><label style={styles.label}>Description</label><textarea required style={styles.textarea} value={formationData.description} onChange={e => setFormationData({ ...formationData, description: e.target.value })} /></div>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}><label style={styles.label}>Prix</label><input type="number" required style={styles.input} value={formationData.prix} onChange={e => setFormationData({ ...formationData, prix: e.target.value })} /></div>
                    <div style={styles.formGroup}><label style={styles.label}>Lieu</label><input required style={styles.input} value={formationData.lieu} onChange={e => setFormationData({ ...formationData, lieu: e.target.value })} /></div>
                  </div>
                  <button type="submit" style={styles.btnPrimary}><Icons.Plus /> Enregistrer</button>
                </form>
              </div>
            </div>
          )}

          {/* SESSIONS (Remplacé par la version fonctionnelle du code 2) */}
          {isIntervenant && activeTab === 'sessions' && (
            <div style={styles.singleColumn}>
              <div style={styles.cardForm}>
                <h3 style={styles.cardTitle}>Planifier une Session</h3>
                <form onSubmit={handleCreateSession} style={styles.form}>

                  {/* SELECTION */}
                  <div style={styles.sectionForm}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Formation</label>
                      <select required style={styles.select} value={sessionForm.formationId} onChange={e => setSessionForm({ ...sessionForm, formationId: e.target.value })}>
                        <option value="">-- Choisir --</option>
                        {myCreatedFormations.map(f => <option key={f.id} value={f.id}>{f.titre}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* DATE & PLACES */}
                  <div style={styles.sectionForm}>
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Date</label>
                        <input type="date" required style={styles.input} value={sessionForm.date} onChange={e => setSessionForm({ ...sessionForm, date: e.target.value })} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Places</label>
                        <input type="number" required style={styles.input} value={sessionForm.nbPlaces} onChange={e => setSessionForm({ ...sessionForm, nbPlaces: e.target.value })} />
                      </div>
                    </div>
                    {/* CHAMP PRIX */}
                    <div style={{ marginTop: '15px' }}>
                      <label style={styles.label}>Prix Session (€)</label>
                      <input type="number" style={styles.input} value={sessionForm.prix} onChange={e => setSessionForm({ ...sessionForm, prix: e.target.value })} placeholder="Optionnel" />
                    </div>
                  </div>

                  {/* HORAIRES */}
                  <div style={styles.sectionForm}>
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.subLabel}>Début</label>
                        <input type="time" required style={styles.input} value={sessionForm.heureDebut} onChange={e => setSessionForm({ ...sessionForm, heureDebut: e.target.value })} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.subLabel}>Fin</label>
                        <input type="time" required style={styles.input} value={sessionForm.heureFin} onChange={e => setSessionForm({ ...sessionForm, heureFin: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <button type="submit" style={styles.btnPrimary}><Icons.Calendar /> Valider la session</button>
                </form>
              </div>
            </div>
          )}

          {/* EMARGEMENT (Intervenant) */}
          {isIntervenant && activeTab === 'emargement' && (
            <div style={styles.singleColumn}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Validation des Présences</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Sélectionnez une session pour voir la liste des inscrits.</p>

                <div style={styles.formGroup}>
                  <select style={styles.select} value={selectedSessionId} onChange={e => handleSelectSessionForEmargement(e.target.value)}>
                    <option value="">-- Sélectionner une session --</option>
                    {agenda.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.formation?.titre} ({new Date(s.dateDebut).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSessionId && (
                  <div style={{ marginTop: '30px' }}>
                    {sessionStudents.length === 0 ? <div style={styles.emptyState}>Aucun étudiant inscrit.</div> : (
                      <div style={styles.listContainer}>
                        {sessionStudents.map(studentIns => {
                          const badge = getStatusBadge(studentIns.statutInscription);
                          const user = studentIns.utilisateur;

                          return (
                            <div key={studentIns.id} style={styles.listItem}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                <div style={styles.miniAvatar}>
                                  {user && user.prenom ? user.prenom.charAt(0) : 'U'}
                                </div>
                                <div>
                                  <span style={{ display: 'block', fontWeight: '600' }}>
                                    {user ? `${user.prenom} ${user.nom}` : "Utilisateur inconnu"}
                                  </span>
                                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    {user?.email || "Email masqué"}
                                  </span>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ ...styles.statusTag, background: badge.bg, color: badge.color }}>
                                  {badge.label}
                                </span>

                                {studentIns.statutInscription === 'SIGNEE' && (
                                  <button onClick={() => validateStudentPresence(studentIns.id)} style={styles.btnValidate}>
                                    <Icons.Check /> Valider
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

// --- STYLES CSS-IN-JS ---
const styles = {
  page: { backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#1e293b' },
  container: { maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' },
  centerMsg: { textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', color: '#64748b' },
  notification: { position: 'fixed', top: '20px', right: '20px', backgroundColor: 'white', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 9999, border: '1px solid #e2e8f0', borderLeftWidth: '4px', fontWeight: '500' },
  header: { backgroundColor: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '30px', border: '1px solid #e2e8f0' },
  headerTop: { display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' },
  avatarContainer: { position: 'relative' },
  avatar: { width: '70px', height: '70px', borderRadius: '50%', background: '#005a8d', color: 'white', fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statusDot: { position: 'absolute', bottom: '2px', right: '2px', width: '14px', height: '14px', backgroundColor: '#10b981', borderRadius: '50%', border: '2px solid white' },
  userInfo: { flex: 1 },
  userName: { margin: '0 0 5px 0', fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' },
  roleWrapper: { display: 'flex', gap: '10px' },
  roleBadge: { backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' },
  specBadge: { backgroundColor: '#e0f2fe', color: '#005a8d', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' },
  contactGrid: { display: 'flex', flexWrap: 'wrap', gap: '25px', paddingTop: '20px', color: '#64748b', fontSize: '0.9rem' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  tabsNav: { display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '1px' },
  tab: { padding: '12px 5px', background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', borderBottom: '2px solid transparent', display: 'flex', alignItems: 'center', gap: '8px' },
  tabActive: { padding: '12px 5px', background: 'transparent', border: 'none', color: '#005a8d', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', borderBottom: '2px solid #005a8d', display: 'flex', alignItems: 'center', gap: '8px' },
  contentArea: { minHeight: '400px' },
  dashboardGrid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' },
  gridSplit: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' },
  singleColumn: { maxWidth: '700px', margin: '0 auto' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', height: 'fit-content' },
  cardLarge: { backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minHeight: '300px' },
  cardForm: { backgroundColor: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
  cardTitle: { marginTop: 0, marginBottom: '20px', fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' },
  statsRow: { display: 'flex', flexDirection: 'column', gap: '15px' },
  statItem: { padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #005a8d' },
  statVal: { display: 'block', fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', lineHeight: 1 },
  statLabel: { fontSize: '0.8rem', color: '#64748b', fontWeight: '500' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  listItem: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '8px', transition: 'background 0.2s' },
  dateBadge: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f2fe', width: '50px', height: '50px', borderRadius: '8px', color: '#005a8d' },
  day: { fontSize: '1.2rem', fontWeight: '700', lineHeight: 1 },
  month: { fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '700' },
  itemMain: { flex: 1 },
  itemTitle: { display: 'block', fontWeight: '600', color: '#334155' },
  itemSub: { fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' },
  itemRight: { textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' },
  statusTag: { fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' },
  btnSign: { background: '#005a8d', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' },
  btnValidate: { background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' },
  miniAvatar: { width: '40px', height: '40px', borderRadius: '50%', background: '#e0f2fe', color: '#005a8d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  compactList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  compactItem: { padding: '12px', borderBottom: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' },
  emptyState: { color: '#94a3b8', fontStyle: 'italic', padding: '20px', textAlign: 'center' },
  sectionForm: { marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px dashed #e2e8f0' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.8rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
  subLabel: { fontSize: '0.75rem', fontWeight: '600', color: '#64748b' },
  input: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#fff', color: '#000' },
  select: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: 'white', color: '#000' },
  textarea: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', minHeight: '100px', resize: 'vertical', backgroundColor: '#fff', color: '#000' },
  btnPrimary: { padding: '12px 20px', backgroundColor: '#005a8d', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', marginTop: '10px' },
  btnSecondary: { padding: '8px 15px', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  btnCancel: { padding: '8px 15px', backgroundColor: 'white', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 },
  modalContent: { backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
  modalTitle: { margin: '0 0 10px 0', color: '#0f172a', textAlign: 'center' },
  modalSub: { margin: '0 0 20px 0', color: '#64748b', fontSize: '0.9rem', textAlign: 'center' },
  canvasContainer: { border: '2px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc', marginBottom: '20px', display: 'flex', justifyContent: 'center' },
  canvas: { cursor: 'crosshair', touchAction: 'none' },
  modalActions: { display: 'flex', gap: '10px', alignItems: 'center' }
};

export default Profil;