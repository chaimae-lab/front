import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FormulaireCriteres = () => {
  const [formData, setFormData] = useState({
    pays: "",
    ville: "",
    dateDepart: "",
    dateRetour: "",
    budget: "",
    voyageurs: {
      enfant: 0,
      jeune: 0,
      adulte: 0, // Par défaut, au moins un adulte
      senior: 0,
    },
    typeVoyage: "",
  });


//   liste 
  const typesVoyage = [
    { value: "loisir", label: "Loisir" },
    { value: "affaires", label: "Affaires" },
    { value: "familial", label: "Familial" },
    { value: "culturel", label: "Culturel" },
    { value: "aventure", label: "Aventure" },
    { value: "romantique", label: "Romantique" },
    { value: "religieux", label: "Religieux" },
  ];
  

  
  // État pour stocker la liste des pays récupérés
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([]);


  
  // Fonction de changement pour mettre à jour les données du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  // Fonction pour modifier le nombre de voyageurs par catégorie
const handleVoyageurChange = (type, increment) => {
  setFormData((prevState) => ({
    ...prevState,
    voyageurs: {
      ...prevState.voyageurs,
      // On empêche d'avoir un nombre négatif
      [type]: Math.max(0, prevState.voyageurs[type] + increment),
    },
  }));
};



  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
  };


  // useEffect pour récupérer la liste des pays dès le montage du composant
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        console.log("Données récupérées :", data); // Vérifie si l'API renvoie des données

        
        // On trie les pays par ordre alphabétique selon leur nom commun
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays :", error);
      }
    };

    fetchCountries();
  }, []);





   // Fonction pour récupérer les villes selon le pays sélectionné
   useEffect(() => {
    const fetchCities = async () => {
      if (!formData.pays) return;

      try {
        const response = await fetch(
          `https://countriesnow.space/api/v0.1/countries/cities/q?country=${formData.pays}`
        );
        const data = await response.json();
        
        if (data.error) {
          setCities([]);
        } else {
          setCities(data.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des villes :", error);
        setCities([]);
      }
    };

    fetchCities();
  }, [formData.pays]);





  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }} 
    >
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="mb-4 text-center">Critères de Voyage</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Pays :</label>
            
            <select
              className="form-control"
              name="pays"
              value={formData.pays}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisissez un pays --</option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Ville :</label>
            <select className="form-control" name="ville" value={formData.ville} onChange={handleChange} required>
              <option value="">-- Choisissez une ville --</option>
              {cities.length > 0 ? (
                cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))
              ) : (
                <option disabled>Aucune ville disponible</option>
              )}
            </select>
          </div>

          
          

          <div className="mb-3">
            <label className="form-label">Date de départ :</label>
            <input
              type="date"
              className="form-control"
              name="dateDepart"
              value={formData.dateDepart}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date de retour :</label>
            <input
              type="date"
              className="form-control"
              name="dateRetour"
              value={formData.dateRetour}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Budget :</label>
            <input
              type="number"
              className="form-control"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </div>


<div className="mb-3">
  <label className="form-label">Voyageurs :</label>
  {["enfant", "jeune", "adulte", "senior"].map((type) => (
    <div key={type} className="d-flex justify-content-between align-items-center mb-2">
      {/* Affichage des catégories avec leur tranche d'âge */}
      <span>
        {type === "enfant" ? "Enfant (0-12 ans)" :
        type === "jeune" ? "Jeune (13-25 ans)" :
        type === "adulte" ? "Adulte (26-60 ans)" :
        "Senior (+60 ans)"}
      </span>
      <div className="d-flex align-items-center">
        {/* Bouton pour diminuer le nombre */}
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleVoyageurChange(type, -1)}>-</button>
        
        {/* Affichage du nombre sélectionné */}
        <span className="mx-2">{formData.voyageurs[type]}</span>

        {/* Bouton pour augmenter le nombre */}
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleVoyageurChange(type, 1)}>+</button>
      </div>
    </div>
  ))}
</div>


<div className="mb-3">
  <label className="form-label">Type de voyage :</label>
  <select
    className="form-control"
    name="typeVoyage"
    value={formData.typeVoyage}
    onChange={handleChange}
    required
  >
    <option value="">-- Choisissez un type --</option>
    {typesVoyage.map((type) => (
      <option key={type.value} value={type.value}>
        {type.label}
      </option>
    ))}
  </select>
</div>


          <button type="submit" className="btn btn-primary w-100">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormulaireCriteres;