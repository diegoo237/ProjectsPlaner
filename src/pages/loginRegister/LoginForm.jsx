import styles from "./LoginForm.module.css";
import PropTypes from "prop-types";
function LoginForm({
  setUserName,
  setPassword,
  handleSubmit,
  setIsRegistering,
}) {
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <span>
          <h1 className={styles.title}>LOGIN</h1>
          <button
            type="button"
            onClick={() => setIsRegistering(true)}
            className={styles.switchButton}
          >
            Register
          </button>
        </span>
        <div>
          <input
            type="text"
            placeholder="Nome de Usuario"
            aria-label="Nome de Usuario"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            aria-label="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.loginBtn}>
          Entrar
        </button>
      </form>
    </div>
  );
}
export default LoginForm;

LoginForm.propTypes = {
  setUserName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setIsRegistering: PropTypes.func.isRequired,
};
