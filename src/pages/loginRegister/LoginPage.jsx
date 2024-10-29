import styles from "./LoginPage.module.css";
import formImg from "../../assets/login.svg";
import { useState } from "react";
import PropTypes from "prop-types";
import Login from "./LoginForm";
import Register from "./RegisterForm";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function registerUser(credentials) {
  return fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function LoginPage({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      let response;
      if (isRegistering) {
        response = await registerUser({ username, password });
        alert(response.message || "Registro realizado com sucesso!");
      } else {
        response = await loginUser({ username, password });
        if (response.message) {
          alert("Usuário ou senha incorretos");
          return;
        }
        setToken(response);
        localStorage.setItem("token", JSON.stringify(response));
      }
    } catch (error) {
      console.error("Erro ao realizar a operação:", error);
      alert("Erro ao realizar a operação. Tente novamente.");
    }
  };

  return (
    <main className={styles.loginPage}>
      <div>
        <img src={formImg} alt="Login illustration" />
      </div>

      {isRegistering ? (
        <Register
          setUserName={setUserName}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          setIsRegistering={setIsRegistering}
        />
      ) : (
        <Login
          setUserName={setUserName}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          setIsRegistering={setIsRegistering}
        />
      )}
    </main>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};
