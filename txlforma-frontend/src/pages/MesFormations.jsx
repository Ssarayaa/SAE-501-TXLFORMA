import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const getDomainImage = (titre) => {
  if (!titre) return '/src/assets/devweb.png';
  const t = titre.toLowerCase();
  if (t.includes('développement') || t.includes('web') || t.includes('react')) return '/src/assets/devweb.png';
  if (t.includes('design') || t.includes('ux') || t.includes('ui')) return '/src/assets/design.png';
  if (t.includes('marketing') || t.includes('seo')) return '/src/assets/marketing.jpg';
  return '/src/assets/devweb.png';
};

const continuerFormation = (inscriptionId, titre) => {
  const t = titre.toLowerCase();
  let url = '/mes-formations';

  if (t.includes('développement') || t.includes('web') || t.includes('react')) {
    url = `/cours/dev/${inscriptionId}`;
  } else if (t.includes('design') || t.includes('ux')) {
    url = `/cours/ux/${inscriptionId}`;
  } else if (t.includes('marketing') || t.includes('seo')) {
    url = `/cours/marketing/${inscriptionId}`;
  }
  window.location.href = url;
};

const styles = {
  page: { backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#2d3436', display: 'flex', flexDirection: 'column', overflowX: 'hidden' },
  headerSection: { backgroundColor: '#0077b6', color: '#fff', padding: '60px 4%', marginBottom: '60px', animation: 'fadeInDown 0.8s ease-out' },
  headerTitle: { fontSize: '2.5rem', fontWeight: '800', margin: 0 },
  headerSubtitle: { fontSize: '1.1rem', opacity: 0.9, marginTop: '10px' },
  container: { width: '94%', maxWidth: '1200px', margin: '0 auto', flex: 1, paddingBottom: '60px' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px', marginTop: '-90px', marginBottom: '50px' },
  kpiCard: { backgroundColor: '#fff', borderRadius: '15px', padding: '25px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', cursor: 'default' },
  kpiIcon: { fontSize: '2rem', marginBottom: '10px', display: 'block' },
  kpiValue: { fontSize: '1.8rem', fontWeight: '900', color: '#0077b6', margin: '5px 0' },
  kpiLabel: { fontSize: '0.9rem', color: '#636e72', fontWeight: '600' },
  sectionTitle: { fontSize: '1.8rem', fontWeight: '800', marginBottom: '30px', color: '#2d3436', borderLeft: '6px solid #f1c40f', paddingLeft: '15px' },
  coursesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' },
  courseCard: { backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column' },
  cardImageContainer: { height: '160px', width: '100%', position: 'relative', overflow: 'hidden' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  categoryBadge: { position: 'absolute', top: '10px', left: '10px', background: 'rgba(0, 119, 182, 0.9)', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' },
  courseContent: { padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' },
  courseTitle: { fontSize: '1.1rem', fontWeight: '700', margin: '0 0 10px 0', color: '#2d3436', lineHeight: '1.4' },
  courseMeta: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' },
  progressContainer: { width: '100%', marginBottom: '20px', marginTop: 'auto' },
  progressLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', marginBottom: '6px', color: '#64748b' },
  progressBarBg: { width: '100%', height: '8px', backgroundColor: '#edf2f7', borderRadius: '4px', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#f1c40f', transition: 'width 1s ease-in-out' },
  btnContinue: { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#0077b6', color: '#fff', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background-color 0.2s ease' },
  loading: { textAlign: 'center', padding: '50px', color: '#64748b', fontStyle: 'italic' },
  emptyState: { textAlign: 'center', padding: '50px', color: '#64748b' }
};

const MesFormations = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/api/utilisateurs/${user.id}/inscriptions`)
        .then(res => res.json())
        .then(data => {
          const formationsMapped = data.map(ins => ({
            id: ins.id,
            titre: ins.session?.formation?.titre || "Formation sans titre",
            categorie: ins.session?.formation?.categorie || "Général",
            dateInscription: ins.dateInscription,
            image: getDomainImage(ins.session?.formation?.titre),
            progression: ins.progression || 0,
            statut: ins.statutInscription
          }));
          setInscriptions(formationsMapped);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erreur:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const stats = {
    enCours: inscriptions.filter(f => f.statut === 'VALIDEE' || f.statut === 'EN_COURS').length,
    terminees: inscriptions.filter(f => f.statut === 'TERMINEE' || f.statut === 'CERTIFIEE').length,
    moyenne: inscriptions.length > 0 ? Math.round(inscriptions.reduce((acc, f) => acc + f.progression, 0) / inscriptions.length) : 0,
    heures: inscriptions.length * 20
  };

  if (!user) return <div style={styles.loading}>Veuillez vous connecter.</div>;
  if (loading) return <div style={styles.loading}>Chargement...</div>;

  return (
    <div style={styles.page}>
      <header style={styles.headerSection}>
        <h1 style={styles.headerTitle}>Mes Formations</h1>
        <p style={styles.headerSubtitle}>Reprenez là où vous vous êtes arrêté.</p>
      </header>

      <main style={styles.container}>
        <section style={styles.kpiGrid}>
          <div style={styles.kpiCard}>
            <span style={styles.kpiIcon}>🔥</span>
            <div style={styles.kpiValue}>{stats.enCours}</div>
            <div style={styles.kpiLabel}>En cours</div>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiIcon}>🥇</span>
            <div style={styles.kpiValue}>{stats.terminees}</div>
            <div style={styles.kpiLabel}>Terminées</div>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiIcon}>🚀</span>
            <div style={styles.kpiValue}>{stats.moyenne}%</div>
            <div style={styles.kpiLabel}>Progression</div>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiIcon}>⏳</span>
            <div style={styles.kpiValue}>{stats.heures}h</div>
            <div style={styles.kpiLabel}>Temps total</div>
          </div>
        </section>

        <h2 style={styles.sectionTitle}>Mon apprentissage</h2>

        {inscriptions.length === 0 ? (
          <div style={styles.emptyState}>
            <h3>Aucune formation en cours.</h3>
            <button
              style={{ ...styles.btnContinue, width: 'auto', margin: '20px auto', backgroundColor: '#f1c40f', color: '#333' }}
              onClick={() => window.location.href = '/catalogue'}
            >
              Voir le catalogue
            </button>
          </div>
        ) : (
          <section style={styles.coursesGrid}>
            {inscriptions.map((course) => (
              <div key={course.id} style={styles.courseCard}>
                <div style={styles.cardImageContainer}>
                  <img src={course.image} alt={course.titre} style={styles.cardImage} />
                  <span style={styles.categoryBadge}>{course.categorie}</span>
                </div>

                <div style={styles.courseContent}>
                  <h3 style={styles.courseTitle}>{course.titre}</h3>
                  <p style={styles.courseMeta}>
                    Débuté le {new Date(course.dateInscription).toLocaleDateString()}
                  </p>

                  <div style={styles.progressContainer}>
                    <div style={styles.progressLabel}>
                      <span>Avancement</span>
                      <span>{course.progression}%</span>
                    </div>
                    <div style={styles.progressBarBg}>
                      <div style={{ ...styles.progressBarFill, width: `${course.progression}%` }}></div>
                    </div>
                  </div>

                  <button
                    style={styles.btnContinue}
                    onClick={() => continuerFormation(course.id, course.titre)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#005a8d'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#0077b6'}
                  >
                    Reprendre
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer />
      <style>{`@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default MesFormations;