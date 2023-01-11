import { FormEvent, useState } from "react";
import styles from "./login.module.css";

interface LoginUserPayload {
    email: string,
    password: string
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function loginUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const payload: LoginUserPayload = {
        email: email,
        password: password
    }
  }

  return (
    <form className={styles.login} onSubmit={e => loginUser(e)}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your username"
        autoComplete="on"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Enter password"
        autoComplete="on"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <input type="submit" value="Login" />
    </form>
  );
}
