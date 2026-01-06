import React from 'react';

const Footer = () => {
  return (
    <footer style={fStyles.footerWrapper}>
      {/* --- STYLE RESPONSIVE --- */}
      <style>{`
        /* Styles par défaut (Desktop) via CSS pour ce qui doit bouger */
        .news-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 60px;
        }
        .news-input-group {
          display: flex;
          gap: 15px;
          flex: 1;
          justify-content: flex-end;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 60px;
        }
        .links-grid {
          display: flex;
          justify-content: space-between;
          flex: 1;
        }
        .brand-section {
          flex: 0 0 300px;
          text-align: left;
        }
        .logo-img {
          margin: 0;
        }

        /* --- TABLETTE & MOBILE (max-width: 968px) --- */
        @media (max-width: 968px) {
          .news-card {
            flex-direction: column;
            text-align: center;
            gap: 25px;
            padding: 30px;
            width: 90% !important; /* Force la largeur */
          }
          .news-input-group {
            width: 100%;
            flex-direction: column;
            align-items: center;
          }
          .minimal-input {
            width: 100% !important;
            max-width: 100% !important;
          }
          .gold-btn {
            width: 100%;
            padding: 15px !important;
          }
          
          .footer-content {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }
          .brand-section {
            flex: auto;
            text-align: center;
            margin-bottom: 20px;
          }
          .logo-img {
            margin: 0 auto; /* Centre le logo */
          }
          
          /* Grille de liens en 2x2 */
          .links-grid {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr; /* 2 colonnes */
            gap: 30px;
            text-align: center;
          }
        }

        /* --- MOBILE TRES PETIT (max-width: 480px) --- */
        @media (max-width: 480px) {
          .links-grid {
            grid-template-columns: 1fr; /* 1 seule colonne */
            gap: 20px;
          }
          .news-title {
            font-size: 1.3rem !important;
          }
        }
      `}</style>

      {/* --- NEWSLETTER : POSITIONNÉE SANS DÉBORDEMENT --- */}
      <div className="news-card" style={fStyles.newsCard}>
        <div style={fStyles.newsTextGroup}>
          <h2 className="news-title" style={fStyles.newsTitle}>Souscrire à la Newsletter</h2>
          <p style={fStyles.newsSub}>
            Chaque mois dans votre boîte mail : <br />
            Recevez chaque semaine les dernières formations.
          </p>
        </div>
        <div className="news-input-group" style={fStyles.newsInputGroup}>
          <input 
            type="email" 
            placeholder="Entrez votre e-mail" 
            className="minimal-input"
            style={fStyles.minimalInput} 
          />
          <button className="gold-btn" style={fStyles.goldBtn}>S’inscrire</button>
        </div>
      </div>

      {/* --- CONTENU DU FOOTER --- */}
      <div className="footer-content" style={fStyles.content}>
        
        {/* Section Marque / Logo */}
        <div className="brand-section" style={fStyles.brandSection}>
          <div style={fStyles.logoBox}>
            <img 
              src="/src/assets/pixelformb.png" 
              alt="Pixel Form Logo" 
              className="logo-img"
              style={fStyles.logoImg} 
            />
          </div>
        </div>

        {/* Section Liens */}
        <div className="links-grid" style={fStyles.linksGrid}>
          <div style={fStyles.column}>
            <h4 style={fStyles.colTitle}>Formations</h4>
            <a href="/catalogue" style={fStyles.a}>Catalogue</a>
          </div>
          <div style={fStyles.column}>
            <h4 style={fStyles.colTitle}>Inscriptions</h4>
            <a href="/login" style={fStyles.a}>Espace de connexion</a>
            <a href="/register" style={fStyles.a}>Espace d’inscription</a>
          </div>
          <div style={fStyles.column}>
            <h4 style={fStyles.colTitle}>Aide</h4>
            <a href="/about" style={fStyles.a}>Qui sommes nous ?</a>
            <a href="/faq" style={fStyles.a}>FAQ ! Vos questions</a>
            <a href="/contact" style={fStyles.a}>Nous contacter</a>
          </div>
          <div style={fStyles.column}>
            <h4 style={fStyles.colTitle}>Support</h4>
            <a href="/mentions" style={fStyles.a}>Mentions légales</a>
            <a href="/cgu" style={fStyles.a}>Conditions générales</a>
            <a href="/privacy" style={fStyles.a}>Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Note: J'ai retiré les styles de layout (flex, width) de fStyles 
// quand ils sont gérés par le CSS responsive ci-dessus pour éviter les conflits.
const fStyles = {
  footerWrapper: {
    width: '100%',
    backgroundColor: '#0077b6',
    position: 'relative',
    marginTop: '150px',
    paddingTop: '140px', // Un peu plus d'espace pour le mobile
    paddingBottom: '60px',
    fontFamily: "'Inter', sans-serif",
    color: '#ffffff',
  },
  newsCard: {
    position: 'absolute',
    top: '-80px', 
    left: '50%',
    transform: 'translateX(-50%)',
    width: '85%',
    maxWidth: '1100px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    // padding, flex gérés par CSS .news-card
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    zIndex: 10,
    boxSizing: 'border-box'
  },
  newsTextGroup: { flex: 1 }, // Gardé pour desktop
  newsTitle: { color: '#111', fontSize: '1.6rem', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-0.5px' },
  newsSub: { color: '#555', fontSize: '1rem', margin: 0, lineHeight: '1.5' },
  // newsInputGroup géré par CSS
  minimalInput: {
    width: '100%',
    maxWidth: '300px',
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid #eee',
    fontSize: '0.9rem',
    outline: 'none',
    color: '#333',
    backgroundColor: '#fcfcfc8c'
  },
  goldBtn: {
    backgroundColor: '#edb92e',
    color: '#000',
    padding: '0 35px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '800',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '48px' // Hauteur fixe pour alignement propre
  },
  content: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    // Flex géré par CSS .footer-content
  },
  brandSection: { 
    // Flex géré par CSS 
  },
  logoBox: { marginBottom: '25px' },
  logoImg: { height: '140px', display: 'block' },
  // linksGrid géré par CSS
  column: { display: 'flex', flexDirection: 'column', gap: '12px' },
  colTitle: { fontSize: '1.1rem', fontWeight: '800', marginBottom: '15px', color: '#fff' },
  a: { 
    color: '#fff', 
    textDecoration: 'none', 
    fontSize: '0.9rem', 
    opacity: '0.7',
    fontWeight: '400',
    transition: 'opacity 0.2s'
  },
};

export default Footer;