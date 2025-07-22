import React from "react";

const Google = () => {
  const baseURL = "http://localhost:8000"; // correct
 // Lien vers ton backend Django

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Connexion Google</h2>
        <div className="d-grid">
          <a href={`${baseURL}/api/google-login/`} className="btn btn-outline-danger">
            <i className="bi bi-google me-2"></i> Se connecter avec Google
          </a>
        </div>
      </div>
    </div>
  );
};



export default Google;

