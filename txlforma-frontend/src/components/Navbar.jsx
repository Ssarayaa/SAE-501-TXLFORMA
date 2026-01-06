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

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      ...styles.link,
      color: isActive ? '#0077b6' : '#2c3e50',
      borderBottom: isActive ? '2px solid #f1c40f' : '2px solid transparent'
    };
  };

  return (
    <>
      <style>{`
        html, body, #root {
          width: 100%;
          max-width: 100% !important;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* --- STYLES DESKTOP & GENERAUX --- */
        .nav-link { 
          position: relative; 
          transition: color 0.3s ease; 
          text-decoration: none; 
          font-weight: 600; 
          font-size: 0.95rem; 
        }
        .nav-link::after { 
          content: ''; 
          position: absolute; 
          width: 0; 
          height: 2px; 
          bottom: -5px; 
          left: 0; 
          background-color: #f1c40f; 
          transition: width 0.3s ease; 
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #0077b6 !important; }

        /* Le conteneur des liens par défaut (Desktop) */
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        /* Cache le hamburger sur desktop */
        .hamburger {
          display: none;
          cursor: pointer;
        }
        
        /* --- STYLES MOBILE (max-width: 768px) --- */
        @media (max-width: 768px) {
          /* Afficher le hamburger */
          .hamburger {
            display: block;
            z-index: 1002;
          }
          
          /* Barres du hamburger */
          .bar {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px auto;
            transition: all 0.3s ease-in-out;
            background-color: #2c3e50;
            border-radius: 3px;
          }

          /* Animation Hamburger en Croix */
          .hamburger.active .bar:nth-child(2) { opacity: 0; }
          .hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
          .hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

          /* Menu Mobile Fullscreen/Slide-in */
          .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px; /* Hauteur de la navbar scrollée */
            flex-direction: column;
            background-color: #ffffff;
            width: 100%;
            height: calc(100vh - 70px); /* Prend tout le reste de l'écran */
            text-align: center;
            transition: 0.3s ease-in-out;
            box-shadow: 0 10px 10px rgba(0,0,0,0.1);
            padding-top: 40px;
            gap: 30px;
          }

          .nav-menu.active {
            left: 0;
          }

          /* Ajustement des éléments internes sur mobile */
          .user-area {
            flex-direction: column;
            gap: 20px;
            width: 100%;
          }
          
          .nav-link {
            font-size: 1.2rem; /* Plus gros sur mobile */
          }
        }
      `}</style>

      <nav style={{
        ...styles.nav,
        height: scrolled ? '70px' : '90px',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
      }}>
        {/* LOGO */}
        <div style={styles.logo} onClick={() => { closeMenu(); navigate('/'); }}>
          <img src="/src/assets/pixelform.png" alt="PixelForm" style={styles.logoImg} />
        </div>

        {/* HAMBURGER ICON (Visible seulement sur mobile via CSS) */}
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
          
          {user && (
            <Link className="nav-link" style={getLinkStyle('/mes-formations')} to="/mes-formations" onClick={closeMenu}>
              Mes formations
            </Link>
          )}
          
          <Link className="nav-link" style={getLinkStyle('/about')} to="/about" onClick={closeMenu}>
            A propos
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
                Profil [{user.nom}]
              </Link>
              <button onClick={handleLogout} style={styles.btnLogout}>
                Déconnexion
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { closeMenu(); navigate('/login'); }} 
              style={styles.btnLogin}
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
    background: 'rgba(255, 255, 255, 0.95)', 
    backdropFilter: 'blur(10px)', 
    position: 'sticky', 
    top: 0, 
    left: 0,
    zIndex: 1000, 
    transition: 'all 0.4s ease',
    width: '100vw', 
    padding: '0 4%', 
    boxSizing: 'border-box', 
    margin: 0
  },
  logo: { cursor: 'pointer', zIndex: 1003 }, // Z-index élevé pour rester clickable
  logoImg: { height: '60px', width: 'auto' },
  // Note: 'links' style supprimé ici car géré par la classe .nav-menu en CSS
  link: { paddingBottom: '2px' },
  userArea: { display: 'flex', alignItems: 'center', gap: '20px' },
  btnLogin: { background: '#f1c40f', color: '#2c3e50', border: 'none', padding: '10px 25px', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' },
  btnLogout: { background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }
};

export default Navbar;