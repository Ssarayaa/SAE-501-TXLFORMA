import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // État pour le menu mobile
  const user = JSON.parse(localStorage.getItem('user'));

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsOpen(false);
    navigate('/');
  };

  // Fermer le menu mobile lors d'un clic sur un lien
  const closeMenu = () => setIsOpen(false);

  // Fonction utilitaire pour le style actif
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      ...styles.link,
      color: isActive ? '#0f172a' : '#64748b', // Slate-900 vs Slate-500
      fontWeight: isActive ? '700' : '500',
    };
  };

  return (
    <>
      <style>{`
        /* Importation de la police Inter pour un look moderne */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        html, body, #root {
          width: 100%;
          max-width: 100% !important;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif; /* Application de la police */
        }

        /* --- STYLES DESKTOP & GENERAUX --- */
        .nav-link { 
          position: relative; 
          text-decoration: none; 
          font-size: 0.95rem; 
          letter-spacing: -0.01em;
          transition: all 0.3s ease;
          padding: 5px 0;
        }

        /* Animation de soulignement moderne (part du centre) */
        .nav-link::after { 
          content: ''; 
          position: absolute; 
          width: 0; 
          height: 2px; 
          bottom: 0px; 
          left: 50%; 
          background-color: #f59e0b; /* Un jaune plus chaud */
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #0f172a !important; } /* Noir doux au survol */

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 32px; /* Espacement plus aéré */
        }

        .hamburger {
          display: none;
          cursor: pointer;
          padding: 10px;
        }
        
        /* --- STYLES MOBILE (max-width: 768px) --- */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
            z-index: 1002;
          }
          
          .bar {
            display: block;
            width: 24px;
            height: 2px; /* Lignes plus fines */
            margin: 6px auto;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: #0f172a;
            border-radius: 2px;
          }

          .hamburger.active .bar:nth-child(2) { opacity: 0; transform: translateX(10px); }
          .hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
          .hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

          .nav-menu {
            position: fixed;
            left: 0;
            top: 0;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98); /* Quasi opaque */
            width: 100%;
            height: 100vh;
            justify-content: center;
            align-items: center;
            text-align: center;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
            transform: translateX(100%); /* Slide depuis la droite, plus naturel sur mobile */
            opacity: 0;
            padding-top: 0;
            gap: 40px;
            z-index: 1001; /* Juste sous le hamburger */
          }

          .nav-menu.active {
            transform: translateX(0);
            opacity: 1;
          }

          .user-area {
            flex-direction: column;
            gap: 25px;
            width: 100%;
            margin-top: 20px;
          }
          
          .nav-link {
            font-size: 1.5rem;
            font-weight: 600;
            color: #0f172a !important;
          }
          
          /* Cacher le soulignement jaune sur mobile pour un look liste propre */
          .nav-link::after { display: none; }
        }
      `}</style>

      <nav style={{
        ...styles.nav,
        height: scrolled ? '70px' : '90px',
        boxShadow: scrolled ? '0 4px 20px -2px rgba(0,0,0,0.05)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid rgba(0,0,0,0.03)',
      }}>
        {/* LOGO */}
        <div style={styles.logo} onClick={() => { closeMenu(); navigate('/'); }}>
          <img src="/src/assets/pixelform.png" alt="PixelForm" style={styles.logoImg} />
        </div>

        {/* HAMBURGER ICON */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* MENU LINKS */}
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>

          <Link className="nav-link" style={getLinkStyle('/catalogue')} to="/catalogue" onClick={closeMenu}>
            Catalogue
          </Link>

          {/* MODIFICATION : Condition pour cacher si INTERVENANT */}
          {user && user.role !== 'INTERVENANT' && (
            <Link className="nav-link" style={getLinkStyle('/mes-formations')} to="/mes-formations" onClick={closeMenu}>
              Mes formations
            </Link>
          )}

          <Link className="nav-link" style={getLinkStyle('/about')} to="/about" onClick={closeMenu}>
            À propos
          </Link>
          <Link className="nav-link" style={getLinkStyle('/contact')} to="/contact" onClick={closeMenu}>
            Support
          </Link>

          {/* ZONE UTILISATEUR */}
          {user ? (
            <div className="user-area" style={styles.userArea}>
              <Link
                to="/Profil"
                className="nav-link"
                style={getLinkStyle('/Profil')}
                onClick={closeMenu}
              >
                Profil
              </Link>
              <button
                onClick={handleLogout}
                style={styles.btnLogout}
                onMouseOver={(e) => e.target.style.background = '#fee2e2'}
                onMouseOut={(e) => e.target.style.background = 'transparent'}
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={() => { closeMenu(); navigate('/login'); }}
              style={styles.btnLogin}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 15px rgba(245, 158, 11, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 10px rgba(245, 158, 11, 0.2)';
              }}
            >
              Se connecter
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)', // Effet verre dépoli plus prononcé
    WebkitBackdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1000,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '100vw',
    padding: '0 6%', // Un peu plus de marge sur les côtés
    boxSizing: 'border-box',
    margin: 0
  },
  logo: { cursor: 'pointer', zIndex: 1003, display: 'flex', alignItems: 'center' },
  logoImg: { height: '50px', width: 'auto', objectFit: 'contain' },
  link: {
    // Les styles de base sont gérés par CSS, ici on garde juste pour l'override dynamique
    cursor: 'pointer'
  },
  userArea: { display: 'flex', alignItems: 'center', gap: '15px' },

  // Bouton Login modernisé : Ombre douce, couleur plus chaude, bords arrondis
  btnLogin: {
    background: '#f59e0b', // Amber-500
    color: '#ffffff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    boxShadow: '0 4px 10px rgba(245, 158, 11, 0.2)',
    transition: 'all 0.3s ease',
    letterSpacing: '0.02em'
  },

  // Bouton Logout épuré
  btnLogout: {
    background: 'transparent',
    border: '1px solid #ef4444',
    color: '#ef4444',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem',
    transition: 'all 0.2s ease'
  }
};

export default Navbar;