import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const VoyageurUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voyageur, setVoyageur] = useState(null);
  const [formData, setFormData] = useState({
    telephone: "",
    date_naissance: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/voyageurs/${id}/`)
      .then((res) => {
        setVoyageur(res.data);
        setFormData({
          telephone: res.data.telephone || "",
          date_naissance: res.data.date_naissance || "",
        });
      })
      .catch((err) => console.error("Erreur GET :", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!voyageur) return;

    const updatedData = {
      ...formData,
      utilisateur_id: voyageur.utilisateur.id,
    };

    axios
      .put(`http://localhost:8000/api/voyageurs/${id}/`, updatedData)
      .then(() => {
        alert("✅ Modification réussie !");
        navigate("/liste");
      })
      .catch((err) => {
        console.error("Erreur PUT :", err);
        alert("❌ Échec de la mise à jour.");
      });
  };

  if (!voyageur) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "500px", borderRadius: "20px" }}>
        <h2 className="text-center text-primary mb-4">
          <i className="fas fa-user-edit me-2"></i>
          Modifier le Voyageur
        </h2>

        <form onSubmit={handleSubmit}>
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
            <i className="fas fa-save me-2"></i>
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoyageurUpdate;
