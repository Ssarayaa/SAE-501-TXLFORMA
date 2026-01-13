import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Profil from "./pages/Profil_temp";
import MesFormations from "./pages/MesFormations";
import Catalogue from "./pages/Catalogue";
import ProfilSelection from "./pages/ProfilSelection";
import Login from "./pages/Login";
import About from "./pages/About";
import CoursUX from "./pages/CoursUX";
import CoursMarketing from "./pages/CoursMarketing";
import CoursDev from "./pages/Coursdev";
import Contact from "./pages/Contact";
import ParticipantCatalog from "./pages/Catalogue";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/choix-profil" element={<ProfilSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mes-formations" element={<MesFormations />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/cours/dev/:id" element={<CoursDev />} />
        <Route path="/cours/ux/:id" element={<CoursUX />} />
        <Route path="/cours/marketing/:id" element={<CoursMarketing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/participant" element={<ParticipantCatalog />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
