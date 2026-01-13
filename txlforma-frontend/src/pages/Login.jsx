import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegistering, setIsRegistering] = useState(false);
  
  const initialFormState = {
    email: '', password: '', nom: '', prenom: '',
    pseudo: '', telephone: '', adresse_postale: '',
    entreprise: '', role: 'PARTICIPANT' 
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam) {
      setIsRegistering(true);
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [location]);

  const toggleMode = () => {
    if (!isRegistering) {
      navigate('/choix-profil'); 
    } else {
      setIsRegistering(false);
      setFormData(initialFormState);
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = "http://localhost:8080/api/utilisateurs";
    const endpoint = isRegistering ? `${baseUrl}/inscription` : `${baseUrl}/connexion`;
    const payload = isRegistering ? formData : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (isRegistering) {
          alert(`Inscription réussie en tant que ${formData.role} !`);
          setIsRegistering(false); setFormData(initialFormState);
          navigate('/login');
        } else {
          localStorage.setItem('user', JSON.stringify(data));
          if (data.role === 'ADMIN') navigate('/admin');
          else if (data.role === 'INTERVENANT') navigate('/intervenant');
          else navigate('/participant');
        }
      } else {
        const text = await res.text();
        alert(text || "Erreur d'authentification");
      }
    } catch (err) { alert("Erreur serveur : le backend ne répond pas."); }
  };

  return (
    <div style={styles.pageContainer}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body { margin: 0; padding: 0; } 
          input:focus { 
            border-color: #0f172a !important; 
            box-shadow: 0 0 0 1px #0f172a;
          }
          .fade-in { animation: fadeIn 0.4s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>

      <div style={styles.mainCard} className="fade-in">
        
        <div style={styles.imageSection}>
          <div style={styles.imageOverlay} />
          <img src="/src/assets/connexion.jpg" alt="Login" style={styles.heroImg} />
        </div>

        <div style={styles.formSection}>
          
          <div style={styles.header}>
            <img src="/src/assets/pixelform.png" alt="Logo" style={styles.logoImg} />
            <h1 style={styles.title}>
              {isRegistering 
                ? (formData.role === 'INTERVENANT' ? "Inscription Intervenant" : "Inscription Étudiant") 
                : "Connexion"}
            </h1>
            <p style={styles.subtitle}>{isRegistering ? "Créez votre compte en quelques clics." : "Heureux de vous revoir."}</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.formContainer}>
            
            {isRegistering && (
              <div style={styles.gridContainer}>
                <div style={styles.field}>
                  <label style={styles.label}>Prénom <span style={styles.red}>*</span></label>
                  <input style={styles.input} type="text" required value={formData.prenom} onChange={e=>setFormData({...formData, prenom:e.target.value})} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Nom <span style={styles.red}>*</span></label>
                  <input style={styles.input} type="text" required value={formData.nom} onChange={e=>setFormData({...formData, nom:e.target.value})} />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Pseudo <span style={styles.red}>*</span></label>
                  <input style={styles.input} type="text" required value={formData.pseudo} onChange={e=>setFormData({...formData, pseudo:e.target.value})} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Tél <span style={styles.red}>*</span></label>
                  <input style={styles.input} type="tel" required value={formData.telephone} onChange={e=>setFormData({...formData, telephone:e.target.value})} />
                </div>

                <div style={styles.field}>
                   <label style={styles.label}>Adresse <span style={styles.red}>*</span></label>
                   <input style={styles.input} type="text" required value={formData.adresse_postale} onChange={e=>setFormData({...formData, adresse_postale:e.target.value})} />
                </div>
                <div style={styles.field}>
                   <label style={styles.label}>Entreprise <span style={styles.opt}>(Opt)</span></label>
                   <input style={styles.input} type="text" value={formData.entreprise} onChange={e=>setFormData({...formData, entreprise:e.target.value})} />
                </div>
              </div>
            )}

            <div style={isRegistering ? styles.gridContainer : styles.columnContainer}>
                <div style={isRegistering ? styles.fieldSpan2 : styles.field}>
                  <label style={styles.label}>Email Pro <span style={styles.red}>*</span></label>
                  <input style={styles.input} type="email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
                </div>
                
                <div style={isRegistering ? styles.fieldSpan2 : styles.field}>
                  <label style={styles.label}>Mot de passe <span style={styles.red}>*</span></label>
                  <input style={styles.input} type="password" required value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})} />
                </div>
            </div>

            <button type="submit" style={styles.btn}>
              {isRegistering ? "Finaliser l'inscription" : "Se connecter"}
            </button>
          </form>

          <div style={styles.footer}>
            <span style={{color:'#64748b'}}>{isRegistering ? "Déjà un compte ?" : "Nouveau ici ?"}</span>
            <span onClick={toggleMode} style={styles.link}>
              {isRegistering ? " Connexion" : " Inscription"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh', 
    width: '100%',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f8fafc', 
    fontFamily: "'Inter', sans-serif",
    padding: '40px 0'
  },
  mainCard: {
    display: 'flex',
    width: '850px', 
    minHeight: '550px',
    height: 'auto', 
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
    overflow: 'hidden'
  },
  imageSection: { 
    flex: 1.2, 
    position: 'relative', 
    backgroundColor: '#0f172a',
    display: 'flex'
  },
  imageOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', zIndex: 1 },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' },
  
  formSection: { 
    flex: 1, 
    padding: '40px 32px', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center' 
  },
  header: { textAlign: 'center', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoImg: { height: '80px', width: 'auto', marginBottom: '16px' },
  title: { fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' },
  subtitle: { fontSize: '11px', color: '#64748b', margin: 0 },
  formContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' },
  columnContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  field: { display: 'flex', flexDirection: 'column' },
  fieldSpan2: { gridColumn: 'span 2', display: 'flex', flexDirection: 'column' },
  label: { fontSize: '10px', fontWeight: '600', color: '#64748b', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.4px' },
  red: { color: '#ef4444' },
  opt: { color: '#94a3b8', fontSize: '9px', textTransform:'none' },
  input: { width: '100%', padding: '7px 10px', fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#ffffff', color: '#0f172a', outline: 'none', boxSizing: 'border-box' },
  btn: { marginTop: '12px', width: '100%', padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  footer: { marginTop: '20px', textAlign: 'center', fontSize: '11px' },
  link: { color: '#0f172a', fontWeight: '700', cursor: 'pointer', marginLeft: '4px' }
};

export default Login;