import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Google = () => {
  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const res = await axios.post("http://localhost:8000/api/google-login/", {
        token: credential,
      });
      
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

    /////
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // ✅ afficher dans la console
    console.log("✅ Connexion réussie !");
    console.log("🔐 Access Token:", res.data.access_token);
    console.log("♻️ Refresh Token:", res.data.refresh_token);
    console.log("👤 Utilisateur:", res.data.user);


      // Rediriger vers formulaire
      window.location.href = "/formulaire";
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="633703049993-h0qc5leo71oqdgl0opejgn1nprhg9u0l.apps.googleusercontent.com">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Connexion Google</h2>
          <div className="d-grid justify-content-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Échec de la connexion Google")}
              width="300"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Google;
