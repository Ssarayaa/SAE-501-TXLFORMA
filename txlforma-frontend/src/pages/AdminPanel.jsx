import { useState, useEffect } from 'react';

function AdminPanel() {
  const [message, setMessage] = useState({ texte: '', type: '' });

  const [listFormations, setListFormations] = useState([]);
  const [listIntervenants, setListIntervenants] = useState([]);
  const [listSessions, setListSessions] = useState([]);
  const [listUtilisateurs, setListUtilisateurs] = useState([]);
  const [listSpecialites, setListSpecialites] = useState([]);

  const [isCustomSpec, setIsCustomSpec] = useState(false);

  const [formation, setFormation] = useState({ titre: '', categorie: '', description: '', duree: '', lieu: '', prix: '' });
  const [intervenant, setIntervenant] = useState({ specialite: '', statut: 'ACTIF', heuresRealisees: 0, utilisateurId: '' });
  const [session, setSession] = useState({ dateDebut: '', dateFin: '', nbPlaces: 12, formationId: '', intervenantId: '' });

  const refreshLists = async () => {
    try {
      const resF = await fetch('http://localhost:8080/api/formations/all');
      if (resF.ok) setListFormations(await resF.json());

      const resI = await fetch('http://localhost:8080/api/intervenants/all');
      if (resI.ok) setListIntervenants(await resI.json());

      const resS = await fetch('http://localhost:8080/api/sessions/all');
      if (resS.ok) setListSessions(await resS.json());

      const resU = await fetch('http://localhost:8080/api/utilisateurs/all');
      if (resU.ok) setListUtilisateurs(await resU.json());

      const resSpec = await fetch('http://localhost:8080/api/intervenants/specialites');
      if (resSpec.ok) setListSpecialites(await resSpec.json());

    } catch (err) { console.error("Erreur refresh:", err); }
  };

  useEffect(() => { refreshLists(); }, []);

  const submitFormation = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/formations/add', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formation, prix: parseFloat(formation.prix) })
    });
    if (res.ok) {
      setMessage({ texte: "✅ Formation créée !", type: 'success' });
      setFormation({ titre: '', categorie: '', description: '', duree: '', lieu: '', prix: '' });
      refreshLists();
    }
  };

  const submitIntervenant = async (e) => {
    e.preventDefault();
    const payload = {
      specialite: intervenant.specialite,
      statut: intervenant.statut,
      heuresRealisees: parseInt(intervenant.heuresRealisees),
      utilisateur: { id: parseInt(intervenant.utilisateurId) }
    };
    const res = await fetch('http://localhost:8080/api/intervenants/add', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setMessage({ texte: "✅ Profil Intervenant validé !", type: 'success' });
      setIntervenant({ specialite: '', statut: 'ACTIF', heuresRealisees: 0, utilisateurId: '' });
      setIsCustomSpec(false);
      refreshLists();
    } else { setMessage({ texte: "❌ Erreur validation.", type: 'error' }); }
  };

  const submitSession = async (e) => {
    e.preventDefault();
    const sessionPayload = {
      dateDebut: session.dateDebut, dateFin: session.dateFin, nbPlaces: parseInt(session.nbPlaces),
      etat: "PLANIFIEE", formation: { id: parseInt(session.formationId) }, intervenant: { id: parseInt(session.intervenantId) }
    };
    try {
      const res = await fetch('http://localhost:8080/api/sessions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionPayload)
      });
      if (res.ok) {
        setMessage({ texte: "✅ Session planifiée !", type: 'success' });
        setSession({ dateDebut: '', dateFin: '', nbPlaces: 12, formationId: '', intervenantId: '' });
        refreshLists();
      }
      else { setMessage({ texte: "❌ Erreur serveur", type: 'error' }); }
    } catch (err) { setMessage({ texte: "❌ Erreur réseau", type: 'error' }); }
  };

  // --- FILTRAGE INTELLIGENT ---
  // On ne prend que les utilisateurs avec le rôle INTERVENANT
  // ET qui ne sont PAS encore dans la table 'intervenant'
  const usersIntervenantsPending = listUtilisateurs.filter(u =>
    u.role === 'INTERVENANT' &&
    !listIntervenants.some(i => i.utilisateur && i.utilisateur.id === u.id)
  );

  return (
    <div style={styles.container}>

      {/* --- FORMULAIRE FORMATION --- */}
      <div style={styles.card}>
        <h3 style={styles.title}>🎓 Créer Formation</h3>
        <form onSubmit={submitFormation} style={styles.form}>
          <input type="text" placeholder="Titre" value={formation.titre} onChange={e => setFormation({ ...formation, titre: e.target.value })} style={styles.input} required />
          <input type="text" placeholder="Catégorie" value={formation.categorie} onChange={e => setFormation({ ...formation, categorie: e.target.value })} style={styles.input} required />
          <textarea placeholder="Description" value={formation.description} onChange={e => setFormation({ ...formation, description: e.target.value })} style={styles.textarea} required />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Durée" value={formation.duree} onChange={e => setFormation({ ...formation, duree: e.target.value })} style={{ ...styles.input, flex: 1 }} required />
            <input type="number" placeholder="Prix (€)" value={formation.prix} onChange={e => setFormation({ ...formation, prix: e.target.value })} style={{ ...styles.input, flex: 1 }} required />
          </div>
          <input type="text" placeholder="Lieu" value={formation.lieu} onChange={e => setFormation({ ...formation, lieu: e.target.value })} style={styles.input} required />
          <button type="submit" style={styles.btnBlue}>Enregistrer Formation</button>
        </form>
      </div>

      {/* --- FORMULAIRE INTERVENANT --- */}
      <div style={styles.card}>
        <h3 style={styles.title}>👨‍🏫 Valider un Intervenant</h3>
        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '15px' }}>Associez une spécialité à un utilisateur inscrit pour activer son compte.</p>

        <form onSubmit={submitIntervenant} style={styles.form}>

          <label style={styles.label}>Utilisateur en attente :</label>
          <select required value={intervenant.utilisateurId} onChange={e => setIntervenant({ ...intervenant, utilisateurId: e.target.value })} style={styles.select}>
            <option value="">-- Sélectionner un inscrit --</option>
            {usersIntervenantsPending.length === 0 ? (
              <option disabled>Aucun intervenant en attente</option>
            ) : (
              usersIntervenantsPending.map(u => (
                <option key={u.id} value={u.id}>{u.nom} {u.prenom} ({u.email})</option>
              ))
            )}
          </select>

          <label style={styles.label}>Spécialité :</label>

          {!isCustomSpec ? (
            <select
              required
              value={listSpecialites.includes(intervenant.specialite) ? intervenant.specialite : ""}
              onChange={(e) => {
                if (e.target.value === "__NEW__") {
                  setIsCustomSpec(true);
                  setIntervenant({ ...intervenant, specialite: "" });
                } else {
                  setIntervenant({ ...intervenant, specialite: e.target.value });
                }
              }}
              style={styles.select}
            >
              <option value="">-- Choisir une spécialité --</option>
              {listSpecialites.map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Saisir la spécialité..."
                value={intervenant.specialite}
                onChange={(e) => setIntervenant({ ...intervenant, specialite: e.target.value })}
                style={{ ...styles.input, flex: 1 }}
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setIsCustomSpec(false)}
                style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', padding: '0 15px', cursor: 'pointer', fontWeight: 'bold' }}
                title="Annuler"
              >
                X
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <select value={intervenant.statut} onChange={e => setIntervenant({ ...intervenant, statut: e.target.value })} style={{ ...styles.select, flex: 1 }}>
              <option value="ACTIF">ACTIF</option>
              <option value="EN_ATTENTE">EN ATTENTE</option>
            </select>
            <input type="number" placeholder="Heures" value={intervenant.heuresRealisees} onChange={e => setIntervenant({ ...intervenant, heuresRealisees: e.target.value })} style={{ ...styles.input, flex: 1 }} />
          </div>

          <button type="submit" style={styles.btnGreen}>Valider le compte</button>
        </form>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>📅 Planifier Session</h3>
        <form onSubmit={submitSession} style={styles.form}>
          <label style={styles.label}>Formation :</label>
          <select required value={session.formationId} onChange={e => setSession({ ...session, formationId: e.target.value })} style={styles.select}>
            <option value="">-- Choisir --</option>
            {listFormations.map(f => <option key={f.id} value={f.id}>{f.titre}</option>)}
          </select>
          <label style={styles.label}>Intervenant validé :</label>
          <select required value={session.intervenantId} onChange={e => setSession({ ...session, intervenantId: e.target.value })} style={styles.select}>
            <option value="">-- Choisir --</option>
            {listIntervenants.map(i => (
              <option key={i.id} value={i.id}>{i.utilisateur ? `${i.utilisateur.nom} ${i.utilisateur.prenom}` : "Sans nom"} - {i.specialite}</option>
            ))}
          </select>
          <label style={styles.label}>Places :</label>
          <input type="number" value={session.nbPlaces} onChange={e => setSession({ ...session, nbPlaces: e.target.value })} style={styles.input} required />
          <div style={styles.dateBlock}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Début :</label>
              <input type="datetime-local" value={session.dateDebut} onChange={e => setSession({ ...session, dateDebut: e.target.value })} style={styles.inputDate} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Fin :</label>
              <input type="datetime-local" value={session.dateFin} onChange={e => setSession({ ...session, dateFin: e.target.value })} style={styles.inputDate} required />
            </div>
          </div>
          <button type="submit" style={styles.btnPurple}>Planifier Session</button>
        </form>
      </div>

      {message.texte && (
        <div style={{ ...styles.toast, backgroundColor: message.type === 'success' ? '#27ae60' : '#e74c3c' }}>
          {message.texte}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', padding: '40px', justifyContent: 'center', backgroundColor: '#f5f7fa', minHeight: '100vh' },
  card: { background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' },
  title: { margin: '0 0 20px 0', color: '#2c3e50', textAlign: 'center', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#34495e', textAlign: 'left', marginBottom: '-5px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', color: '#000', backgroundColor: '#fff', width: '100%', boxSizing: 'border-box' },
  select: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', color: '#000', backgroundColor: '#fff', width: '100%', boxSizing: 'border-box' },
  inputDate: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', color: '#000', backgroundColor: '#fff', width: '100%', boxSizing: 'border-box' },
  dateBlock: { display: 'flex', gap: '12px' },
  textarea: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px', color: '#000', backgroundColor: '#fff', width: '100%', boxSizing: 'border-box' },
  btnBlue: { padding: '14px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' },
  btnGreen: { padding: '14px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' },
  btnPurple: { padding: '14px', background: '#9b59b6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' },
  toast: { position: 'fixed', bottom: '20px', right: '20px', color: 'white', padding: '15px 25px', borderRadius: '10px', zIndex: 1000, boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }
};

export default AdminPanel;