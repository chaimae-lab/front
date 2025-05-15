import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select"; // Importer react-select
import CurrencyInput from 'react-currency-input-field';


const FormulaireCriteres = () => {

  const [showPlan, setShowPlan] = useState(false);  // Pour afficher ou non le plan
  const [planVoyage, setPlanVoyage] = useState(null); // Pour stocker le plan de voyage généré
  
  const [formData, setFormData] = useState({
    pays: [],
    villes: [],
    adresse: "",
    adresseDepart: "",
    dateDepart: "",
    dateRetour: "",
    budget: "",
    voyageurs: {
      enfant: 0,
      jeune: 0,
      adulte: 1,
      senior: 0,
    },
    typeVoyage: "",
    
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [adresses, setAdresses] = useState([]); 
  const [budget, setBudget] = useState([]); 
// type de voyage 
  const typesVoyage = [
    { value: "loisir", label: "Loisir" },
    { value: "affaires", label: "Affaires" },
    { value: "familial", label: "Familial" },
    { value: "culturel", label: "Culturel" },
    { value: "aventure", label: "Aventure" },
    { value: "romantique", label: "Romantique" },
    { value: "religieux", label: "Religieux" },
  ];


  // pays 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/pays/");
        const data = await response.json();
        setCountries(data.map(country => ({ id: country.id, value: country.nom, label: country.nom })));
      } catch (error) {
        console.error("Erreur lors de la récupération des pays :", error);
      }
    };
    fetchCountries();
  }, []);



  //ville

  useEffect(() => {
    const fetchCitiesForSelectedCountries = async () => {
      let allCities = [];
      for (let pays of formData.pays) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/villes/${pays}/`
          );
          const data = await response.json();
          allCities = [...allCities, ...data];
        } catch (error) {
          console.error("Erreur pour le pays", pays, ":", error);
        }
      }
      setCities(allCities.map(city => ({ id: city.id, value: city.nom, label: city.nom })));
    };

    if (formData.pays.length > 0) {
      fetchCitiesForSelectedCountries();
    } else {
      setCities([]);
    }
  }, [formData.pays]);


  //all adresse 
  useEffect(() => {
    const fetchAdresses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/adresses/");
        const data = await response.json();
  
        // Map les données pour n'afficher que la rue
        const formattedAdresses = data.map(adresse => ({id: adresse.id,
          value: adresse.id,
          label: adresse.rue // 👈 ici on affiche que la rue
        }));
  
        setAdresses(formattedAdresses);
        console.log("✅ Adresses récupérées :", formattedAdresses);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des adresses :", error);
      }
    };
  
    fetchAdresses();
  }, []);
   
  ////////////  post (critere)
  const envoyerDonnees = async (payload) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/criteres/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("🛑 Erreur du backend :", data);
      } else {
        console.log("✅ Données envoyées avec succès :", data);
  
        // Si le backend renvoie l'ID du critère
        if (data.id) {
          await getPlanVoyage(data.id);  // Appel API pour récupérer le plan
        }
      }
    } catch (error) {
      console.error("❌ Erreur réseau :", error);
    }
  };
  
  

  
  //////////////get plan 

  const getPlanVoyage = async (idCritere) => {
    try {
      const response = await fetch(`http://localhost:8000/api/plan_voyage/${idCritere}/`);
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Erreur lors de la récupération du plan :", data);
      } else {
        console.log(" Plan de voyage récupéré :", data);
        setPlanVoyage(data);  // mettre à jour l’état pour l’affichage
        setShowPlan(true);    // afficher la section du plan si besoin
      }
    } catch (error) {
      console.error(" Erreur réseau pour le plan :", error);
    }
  };
  
  
  
  
  // plusieur choix 

  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;

    if (multiple) {
      const values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  //
  const handleSelectChange = (selectedOptions, name) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOptions.map(option => option.value) }));
  };

  //nombre de voyageur 

  const handleVoyageurChange = (type, increment) => {
    setFormData((prev) => ({
      ...prev,
      voyageurs: {
        ...prev.voyageurs,
        [type]: Math.max(0, prev.voyageurs[type] + increment),
      },
    }));
  };

  //form 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // On récupère les IDs à partir des objets sélectionnés AJOUTER 
    const selectedCountryIDs = countries
      .filter(country => formData.pays.includes(country.value))
      .map(country => country.id);
  
    const selectedCityIDs = cities
      .filter(city => formData.villes.includes(city.value))
      .map(city => city.id);
  
    const selectedAdresseID = parseInt(formData.adresseDepart);

    const payload = {
      utilisateur: 1, // ou l'utilisateur connecté si dispo
      pays_arrivee: selectedCountryIDs,
      ville_destination: selectedCityIDs,
      adresse_depart: selectedAdresseID,// ID de l’adresse
      adresse: formData.adresseDepart, 
      date_depart: formData.dateDepart,
      date_retour: formData.dateRetour,
      //budget_total: parseFloat(budget),
      budget_total: parseFloat(formData.budget),

      type_voyage: formData.typeVoyage,
      voyageurs_enfant: formData.voyageurs.enfant,
      voyageurs_jeune: formData.voyageurs.jeune,
      voyageurs_adulte: formData.voyageurs.adulte,
      voyageurs_senior: formData.voyageurs.senior,
    };
  
    console.log("📦 Payload prêt à être envoyé :", payload);
    envoyerDonnees(payload);
    
    
  };



  

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
        <h2 className="mb-4 text-center">Critères de Voyage</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Pays :</label>
            <Select
              isMulti
              name="pays"
              options={countries}
              onChange={(selectedOptions) => handleSelectChange(selectedOptions, "pays")}
              value={countries.filter(country => formData.pays.includes(country.value))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Villes :</label>
            <Select
              isMulti
              name="villes"
              options={cities}
              onChange={(selectedOptions) => handleSelectChange(selectedOptions, "villes")}
              value={cities.filter(city => formData.villes.includes(city.value))}
            />
          </div>


          
          <div className="mb-3">
  <label className="form-label">Adresse de depart :</label>
  <Select
    name="adresse"
    options={adresses}
    onChange={(selectedOption) =>
      setFormData((prev) => ({ ...prev, adresse: selectedOption?.value || "" }))
    }
    value={adresses.find(adresse => adresse.value === formData.adresse) || null}
  />
</div>


<div className="mb-3">
  <label className="form-label">Adresse :</label>
  <input
    type="text"
    className="form-control"
    name="adresseDepart"
    value={formData.adresseDepart}
    onChange={handleChange}
    placeholder="Entrez votre adresse de départ"
  />
</div>

                                                      


          <div className="mb-3">
            <label className="form-label">Date de départ :</label>
            <input type="date" className="form-control" name="dateDepart" value={formData.dateDepart} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Date de retour :</label>
            <input type="date" className="form-control" name="dateRetour" value={formData.dateRetour} onChange={handleChange} required />
          </div>

          <div className="mb-3">
          <label className="form-label">Budget :</label>
          <CurrencyInput
  className="form-control"
  name="budget"
  decimalsLimit={2}
  value={formData.budget}
  onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
  prefix="€"
/>
    </div>


          <div className="mb-3">
            <label className="form-label">Voyageurs :</label>
            {["enfant", "jeune", "adulte", "senior"].map((type) => (
              <div key={type} className="d-flex justify-content-between align-items-center mb-2">
                <span>
                  {type === "enfant"
                    ? "Enfant (0-12 ans)"
                    : type === "jeune"
                    ? "Jeune (13-25 ans)"
                    : type === "adulte"
                    ? "Adulte (26-60 ans)"
                    : "Senior (+60 ans)"}
                </span>
                <div className="d-flex align-items-center">
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleVoyageurChange(type, -1)}>-</button>
                  <span className="mx-2">{formData.voyageurs[type]}</span>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleVoyageurChange(type, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Type de voyage :</label>
            <select className="form-control" name="typeVoyage" value={formData.typeVoyage} onChange={handleChange} required>
              <option value="">-- Choisissez un type --</option>
              {typesVoyage.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          
       

          <button type="submit" className="btn btn-primary w-100">
            Valider
          </button>
        </form>




      </div>
    </div>
  );
};

export default FormulaireCriteres;
