import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      axios
        .post("http://localhost:8000/api/google-login/", { code })  
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          navigate("/");
        })
        .catch((err) => {
          console.error("Erreur Google login:", err);
        });
    }
  }, [navigate]);

  return <p>Connexion en cours avec Google...</p>;
};

export default GoogleCallback;
