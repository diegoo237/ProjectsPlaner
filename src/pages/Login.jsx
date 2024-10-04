import styles from "./Login.module.css";
function Login() {
  return (
    <main className={styles.loginPage}>
      <form className={styles.loginForm}>
        <div>
          <label>Login</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Senha</label>
          <input type="text"></input>
        </div>
        <div>
          <button className={styles.loginBtn}>Entrar</button>
        </div>
      </form>
    </main>
  );
}
export default Login;
