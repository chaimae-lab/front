import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select"; // Importer react-select

const FormulaireCriteres = () => {
  const [formData, setFormData] = useState({
    pays: [],
    villes: [],
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
        setCountries(data.map(country => ({ value: country.nom, label: country.nom })));
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
      setCities(allCities.map(city => ({ value: city.nom, label: city.nom })));
    };

    if (formData.pays.length > 0) {
      fetchCitiesForSelectedCountries();
    } else {
      setCities([]);
    }
  }, [formData.pays]);


  
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
    console.log("Form Data envoyé:", formData);
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
            <label className="form-label">Date de départ :</label>
            <input type="date" className="form-control" name="dateDepart" value={formData.dateDepart} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Date de retour :</label>
            <input type="date" className="form-control" name="dateRetour" value={formData.dateRetour} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Budget :</label>
            <input type="number" className="form-control" name="budget" value={formData.budget} onChange={handleChange} required />
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
