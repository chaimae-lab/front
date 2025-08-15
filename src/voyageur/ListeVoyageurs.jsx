import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance"; // ✅ utilise ton axiosInstance
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ListeVoyageurs = () => {
  const [voyageurs, setVoyageurs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("mes-voyageurs/") // ✅ nouvelle route API
      .then((response) => setVoyageurs(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des voyageurs :", error)
      );
  }, []);

  const handleAjouter = () => {
    navigate("/profil");
  };

  const handleModifier = (id) => {
    const selectedVoyageur = voyageurs.find((v) => v.id === id);
    navigate(`/update/${id}`, { state: { voyageur: selectedVoyageur } });
  };

  const handleSupprimer = async (id) => {
    if (window.confirm("Es-tu sûr de vouloir supprimer ce voyageur ?")) {
      try {
        await axiosInstance.delete(`voyageurs/${id}/`); // ✅ token ajouté automatiquement
        alert("Voyageur supprimé avec succès !");
        setVoyageurs(voyageurs.filter((v) => v.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur lors de la suppression du voyageur.");
      }
    }
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#f4f7fa", minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 mx-auto"
        style={{ maxWidth: "1000px" }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-primary fw-bold">Liste des Voyageurs</h3>
            <button className="btn btn-primary px-3" onClick={handleAjouter}>
              ➕ Ajouter
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>👤 Utilisateur</th>
                  <th>📧 Email</th>
                  <th>📞 Téléphone</th>
                  <th>🎂 Date de naissance</th>
                  <th>⚙️</th>
                </tr>
              </thead>
              <tbody>
                {voyageurs.length > 0 ? (
                  voyageurs.map((voyageur) => (
                    <tr key={voyageur.id}>
                      <td>{voyageur.utilisateur?.username || "-"}</td>
                      <td>{voyageur.utilisateur?.email || "-"}</td>
                      <td>{voyageur.telephone || "-"}</td>
                      <td>{voyageur.date_naissance || "-"}</td>
                      <td>
                        <span
                          role="button"
                          className="me-3 text-primary"
                          title="Modifier"
                          onClick={() => handleModifier(voyageur.id)}
                          style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        >
                          ✏️
                        </span>
                        <span
                          role="button"
                          className="text-danger"
                          title="Supprimer"
                          onClick={() => handleSupprimer(voyageur.id)}
                          style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        >
                          🗑️
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      Aucun voyageur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeVoyageurs;
