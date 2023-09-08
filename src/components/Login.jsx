import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://server-0ugo.onrender.com/login", {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      console.log("token guardado en el localstorage");
      console.log(response.data);

      // Redirigir automáticamente utilizando navigate
      navigate("/inicio");
      
    } catch (error) {
      console.error(error);
      alert("Usuario inválido");
    }
  };

  return (
    <div>
      <h2>Inicio de sesión</h2>
      <form onSubmit={handleSubmit} className="form-group login"> 
        <div>
          <label>Email:</label>
          <input className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success login" type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
