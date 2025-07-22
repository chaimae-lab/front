import React from "react";

const Login = () => {
  const baseURL = "http://localhost:8000"; // Ton backend Django

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <div className="d-grid gap-2">
          <a href={`${baseURL}/auth/login/facebook/`} className="btn btn-outline-primary">
            <i className="bi bi-facebook me-2"></i> Se connecter avec Facebook
          </a>
          <a href={`${baseURL}/auth/login/instagram/`} className="btn btn-outline-warning text-dark">
            <i className="bi bi-instagram me-2"></i> Se connecter avec Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
