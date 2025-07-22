import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess";
import FormulaireCriteres from "./components/FormulaireCriteres";
import Google from "./pages/google";
import Api from "./pages/Api";
import VoyageurProfil from "./voyageur/VoyageurProfil"
import GoogleCallback from "./pages/GoogleCallback";
import ListeVoyageurs from "./voyageur/ListeVoyageurs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Google" element={<Google/>} />
        
        <Route path="/google/callback" element={<GoogleCallback />} />   
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/formulaire" element={<FormulaireCriteres />} />
        <Route path="/api" element={<Api />} />
        <Route path="/profil" element={<VoyageurProfil />} />
        <Route path="/liste" element={<ListeVoyageurs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
