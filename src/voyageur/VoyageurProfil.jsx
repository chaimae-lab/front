import React, { useState } from "react";

const VoyageurProfil = () => {
  const [profil, setProfil] = useState({
    telephone: "",
    nationalite: "",
    date_naissance: "",
    sexe: "",
    langues_parlees: "",
    preferences_transport: "",
    preferences_hebergement: "",
    centres_interet: "",
  });

  const handleChange = (e) => {
    setProfil({ ...profil, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enregistrer profil:", profil);
    // TODO: Envoyer au backend Django ici
  };

  const handleDelete = () => {
    if (window.confirm("Es-tu sûre de vouloir supprimer ton profil ?")) {
      console.log("Suppression du profil...");
      // TODO: Appel API pour suppression backend
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
        <h2 className="mb-4 text-center">Profil Voyageur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="telephone" className="form-label">Téléphone</label>
            <input
              type="text"
              className="form-control"
              id="telephone"
              name="telephone"
              value={profil.telephone}
              onChange={handleChange}
              placeholder="Ex: 0600000000"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nationalite" className="form-label">Nationalité</label>
            <input
              type="text"
              className="form-control"
              id="nationalite"
              name="nationalite"
              value={profil.nationalite}
              onChange={handleChange}
              placeholder="Ex: Marocaine"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date_naissance" className="form-label">Date de naissance</label>
            <input
              type="date"
              className="form-control"
              id="date_naissance"
              name="date_naissance"
              value={profil.date_naissance}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sexe" className="form-label">Sexe</label>
            <select
              className="form-select"
              id="sexe"
              name="sexe"
              value={profil.sexe}
              onChange={handleChange}
            >
              <option value="">-- Choisir --</option>
              <option value="femme">Femme</option>
              <option value="homme">Homme</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="langues_parlees" className="form-label">Langues parlées</label>
            <input
              type="text"
              className="form-control"
              id="langues_parlees"
              name="langues_parlees"
              value={profil.langues_parlees}
              onChange={handleChange}
              placeholder="Ex: français, anglais"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="preferences_transport" className="form-label">Transport préféré</label>
            <input
              type="text"
              className="form-control"
              id="preferences_transport"
              name="preferences_transport"
              value={profil.preferences_transport}
              onChange={handleChange}
              placeholder="Ex: avion, train"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="preferences_hebergement" className="form-label">Hébergement préféré</label>
            <input
              type="text"
              className="form-control"
              id="preferences_hebergement"
              name="preferences_hebergement"
              value={profil.preferences_hebergement}
              onChange={handleChange}
              placeholder="Ex: hôtel, auberge"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="centres_interet" className="form-label">Centres d’intérêt</label>
            <input
              type="text"
              className="form-control"
              id="centres_interet"
              name="centres_interet"
              value={profil.centres_interet}
              onChange={handleChange}
              placeholder="Ex: nature, gastronomie"
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-success px-5">
              Enregistrer
            </button>
            <button type="button" className="btn btn-danger px-5" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoyageurProfil;
