import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/formulaire");
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return <p className="text-center mt-10">Authentification en cours...</p>;
};

export default AuthSuccess;
