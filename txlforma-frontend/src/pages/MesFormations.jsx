import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'avoir react-router-dom installé
import Footer from '../components/Footer';

// --- Assets / Icons (SVG Components pour remplacer les Emojis) ---
const Icons = {
  Play: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
  Award: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
  Activity: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};

// --- Helpers ---
const getDomainImage = (titre) => {
  if (!titre) return '/src/assets/devweb.png';
  const t = titre.toLowerCase();
  if (t.includes('design') || t.includes('ux') || t.includes('ui')) return '/src/assets/design.png';
  if (t.includes('marketing') || t.includes('seo')) return '/src/assets/marketing.jpg';
  // Default fallback
  return '/src/assets/devweb.png';
};

const MesFormations = () => {
  const navigate = useNavigate();
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/api/utilisateurs/${user.id}/inscriptions`)
        .then(res => res.json())
        .then(data => {
          const formationsMapped = data.map(ins => ({
            id: ins.id,
            titre: ins.session?.formation?.titre || "Formation sans titre",
            categorie: ins.session?.formation?.categorie || "Général",
            dateInscription: new Date(ins.dateInscription).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
            image: getDomainImage(ins.session?.formation?.titre),
            progression: ins.progression || 0,
            statut: ins.statutInscription
          }));
          setInscriptions(formationsMapped);
        })
        .catch(err => console.error("Erreur:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleNavigation = (inscriptionId, titre) => {
    const t = titre.toLowerCase();
    let path = '/mes-formations';

    if (t.includes('design') || t.includes('ux')) path = `/cours/ux/${inscriptionId}`;
    else if (t.includes('marketing') || t.includes('seo')) path = `/cours/marketing/${inscriptionId}`;
    else path = `/cours/dev/${inscriptionId}`; // Default dev

    navigate(path);
  };

  const stats = {
    enCours: inscriptions.filter(f => ['VALIDEE', 'EN_COURS'].includes(f.statut)).length,
    terminees: inscriptions.filter(f => ['TERMINEE', 'CERTIFIEE'].includes(f.statut)).length,
    moyenne: inscriptions.length > 0 ? Math.round(inscriptions.reduce((acc, f) => acc + f.progression, 0) / inscriptions.length) : 0,
    heures: inscriptions.length * 20
  };

  if (!user) return <div className="loading-container">Veuillez vous connecter pour accéder à vos cours.</div>;

  return (
    <>
      <div className="page-wrapper">
        {/* Header Hero */}
        <header className="hero-section">
          <div className="container">
            <h1 className="hero-title">Tableau de bord</h1>
            <p className="hero-subtitle">Bienvenue, reprenez votre apprentissage là où vous l'avez laissé.</p>
          </div>
        </header>

        <main className="container main-content">
          {/* KPI Section */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper blue"><Icons.Play /></div>
              <div className="stat-info">
                <span className="stat-value">{loading ? '-' : stats.enCours}</span>
                <span className="stat-label">Formations en cours</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper yellow"><Icons.Award /></div>
              <div className="stat-info">
                <span className="stat-value">{loading ? '-' : stats.terminees}</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper green"><Icons.Activity /></div>
              <div className="stat-info">
                <span className="stat-value">{loading ? '-' : stats.moyenne}%</span>
                <span className="stat-label">Progression globale</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper purple"><Icons.Clock /></div>
              <div className="stat-info">
                <span className="stat-value">{loading ? '-' : stats.heures}h</span>
                <span className="stat-label">Temps d'étude</span>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <div className="section-header">
            <h2 className="section-title"><Icons.Book /> Mon apprentissage</h2>
          </div>

          {loading ? (
            <div className="courses-grid">
              {[1, 2, 3].map(i => <div key={i} className="course-card skeleton-card"></div>)}
            </div>
          ) : inscriptions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><Icons.Book /></div>
              <h3>Aucune formation active</h3>
              <p>Explorez notre catalogue pour commencer une nouvelle compétence.</p>
              <button className="btn-primary" onClick={() => navigate('/catalogue')}>
                Découvrir le catalogue
              </button>
            </div>
          ) : (
            <div className="courses-grid">
              {inscriptions.map((course) => (
                <article key={course.id} className="course-card">
                  <div className="card-image-wrapper">
                    <img src={course.image} alt={course.titre} className="card-image" />
                    <span className="category-badge">{course.categorie}</span>
                  </div>

                  <div className="card-content">
                    <div className="card-body">
                      <h3 className="course-title" title={course.titre}>{course.titre}</h3>
                      <p className="course-date">Inscrit le {course.dateInscription}</p>

                      <div className="progress-block">
                        <div className="progress-text">
                          <span>Progression</span>
                          <span className="percentage">{course.progression}%</span>
                        </div>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${course.progression}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <button
                        className="btn-action"
                        onClick={() => handleNavigation(course.id, course.titre)}
                      >
                        {course.progression > 0 ? 'Reprendre' : 'Commencer'}
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>

      {/* Styles CSS intégrés pour la portabilité */}
      <style>{`
        :root {
          --primary: #0077b6;
          --primary-dark: #023e8a;
          --secondary: #f1c40f;
          --bg-page: #f8fafc;
          --bg-card: #ffffff;
          --text-main: #1e293b;
          --text-muted: #64748b;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
          --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
          --radius: 12px;
        }

        /* Layout global */
        .page-wrapper {
          background-color: var(--bg-page);
          min-height: 100vh;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          color: var(--text-main);
          display: flex;
          flex-direction: column;
        }

        .container {
          width: 92%;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Hero Header */
        .hero-section {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 3rem 0 6rem; /* Padding bottom large for overlap */
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          font-weight: 400;
          max-width: 600px;
        }

        /* Stats KPI Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: -4rem; /* Overlap effect */
          margin-bottom: 3rem;
        }

        .stat-card {
          background: var(--bg-card);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e0f2fe;
          color: var(--primary);
        }

        .stat-icon-wrapper.yellow { background: #fef9c3; color: #b45309; }
        .stat-icon-wrapper.green { background: #dcfce7; color: #15803d; }
        .stat-icon-wrapper.purple { background: #f3e8ff; color: #7e22ce; }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding-bottom: 4rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 1rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-main);
          margin: 0;
        }

        .section-title svg {
          color: var(--primary);
        }

        /* Courses Grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .course-card {
          background: var(--bg-card);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .course-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
          transform: translateY(-4px);
        }

        .card-image-wrapper {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .course-card:hover .card-image {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.95);
          color: var(--primary-dark);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-body {
          flex: 1;
        }

        .course-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-date {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .progress-block {
          margin-bottom: 1.5rem;
        }

        .progress-text {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .percentage {
          color: var(--primary);
        }

        .progress-track {
          width: 100%;
          height: 6px;
          background-color: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--secondary);
          border-radius: 10px;
          transition: width 1s ease-out;
        }

        .card-footer {
          margin-top: auto;
        }

        .btn-action {
          width: 100%;
          padding: 10px 20px;
          background-color: var(--bg-page);
          color: var(--primary);
          border: 1px solid var(--primary);
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .btn-action:hover {
          background-color: var(--primary);
          color: white;
        }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: var(--radius);
          border: 2px dashed #e2e8f0;
        }
        
        .empty-icon {
          font-size: 3rem;
          color: #cbd5e1;
          margin-bottom: 1rem;
        }
        
        .empty-state h3 {
          margin: 0 0 0.5rem 0;
          color: var(--text-main);
        }
        
        .empty-state p {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .btn-primary {
          background-color: var(--secondary);
          color: #1e293b;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .btn-primary:hover {
          background-color: #d4ac0d;
        }

        /* Loading / Skeleton */
        .skeleton-card {
          height: 380px;
          background: #f1f5f9;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        @media (max-width: 768px) {
          .stats-grid {
            margin-top: -2rem;
            grid-template-columns: 1fr 1fr;
          }
          .hero-title { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
};

export default MesFormations;