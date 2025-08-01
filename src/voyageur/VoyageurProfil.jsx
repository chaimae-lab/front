import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 IMPORTER useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const FormVoyageur = () => {
  const [formData, setFormData] = useState({
    utilisateur_id: "",
    telephone: "",
    date_naissance: "",
  });

  const navigate = useNavigate(); // 👈 INITIALISER useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/voyageurs/", formData);
      alert("✅ Voyageur créé avec succès !");
      setFormData({ utilisateur_id: "", telephone: "", date_naissance: "" });
      navigate("/liste"); // 👈 REDIRECTION VERS LA PAGE LISTE
    } catch (error) {
      console.error("❌ Erreur :", error.response?.data || error.message);
      alert("Erreur lors de la création du voyageur.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "500px", borderRadius: "20px" }}>
        <h2 className="text-center text-primary mb-4">
          <i className="fas fa-user-plus me-2"></i>
          Ajouter un Voyageur
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="utilisateur_id" className="form-label fw-semibold">ID Utilisateur</label>
            <input
              type="number"
              className="form-control"
              id="utilisateur_id"
              name="utilisateur_id"
              value={formData.utilisateur_id}
              onChange={handleChange}
              placeholder="Ex: 1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telephone" className="form-label fw-semibold">Téléphone</label>
            <input
              type="text"
              className="form-control"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Ex: 0600000000"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date_naissance" className="form-label fw-semibold">Date de naissance</label>
            <input
              type="date"
              className="form-control"
              id="date_naissance"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="fas fa-paper-plane me-2"></i>
            Créer Voyageur
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormVoyageur;
