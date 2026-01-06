import React, { useState, useEffect } from 'react';

const IntervenantPanel = () => {
  const [sessions, setSessions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // On récupère les sessions où cet intervenant est assigné
    fetch(`http://localhost:8080/api/sessions/all`)
      .then(res => res.json())
      .then(data => {
        // Optionnel : filtrer pour ne voir que SES sessions si ton backend le permet
        setSessions(data);
      });
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f1c40f', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Espace Formateur</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '20px', borderRadius: '15px' }}>
        <h3>Mes Prochaines Sessions</h3>
        {sessions.length === 0 ? <p>Aucune session assignée.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>Formation</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Places</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{s.formation?.titre}</td>
                  <td style={{ padding: '10px' }}>{new Date(s.dateDebut).toLocaleDateString()}</td>
                  <td style={{ padding: '10px' }}>{s.nbPlaces}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IntervenantPanel;