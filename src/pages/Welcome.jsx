import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css"; 

const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="overlay">
        <div className="content text-center">
          <div className="icon mb-4">
            <i className="bi bi-globe-americas"></i>
          </div>
          <h1 className="title mb-3">Bienvenue sur <span>Travel Planner</span></h1>
          <p className="subtitle mb-4">
            Organisez vos voyages de rêve, créez des itinéraires inoubliables et explorez le monde avec simplicité.
          </p>
          <Link to="/login" className="btn btn-light btn-lg shadow w-100 mb-3">
  Se connecter en tant que visiteur
</Link>
<Link to="/api" className="btn btn-outline-light btn-lg shadow w-100">
  Se connecter en tant que professionnel
</Link>

        </div>
      </div>
    </div>
  );
};

export default Welcome;
