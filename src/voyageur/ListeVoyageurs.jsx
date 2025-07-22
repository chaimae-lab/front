import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ListeVoyageurs = () => {
  const voyageurs = [
    {
      id: 1,
      nom: "Ahmed",
      email: "ahmed@example.com",
      telephone: "0600000001",
    },
    {
      id: 2,
      nom: "Fatima",
      email: "fatima@example.com",
      telephone: "0600000002",
    },
  ];

  const handleAjouter = () => {
    alert("Bouton Ajouter cliqué !");
    // Ajoute ici une redirection ou une modal si besoin
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f0f8ff" }}>
      <div className="card shadow-lg p-4" style={{ width: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary mb-0">📘 Liste des Voyageurs</h2>
          <button className="btn btn-primary" onClick={handleAjouter}>
            ➕ Ajouter un voyageur
          </button>
        </div>

        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {voyageurs.map((voyageur) => (
              <tr key={voyageur.id}>
                <td>{voyageur.nom}</td>
                <td>{voyageur.email}</td>
                <td>{voyageur.telephone}</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm me-2">
                    ✏️ Modifier
                  </button>
                  <button className="btn btn-outline-danger btn-sm">
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeVoyageurs;
