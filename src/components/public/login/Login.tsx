import styles from "./login.module.css";

export default function Login() {
    return (
        <form className={styles.login}>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Enter your username" 
                autoComplete="on"
                onChange={(e) => () => {}}>
            </input>
            <input
                type="password" 
                placeholder="Enter password"
                autoComplete="on"
                onChange={(e) => () => {}}>
            </input>
            
            <input type="submit" value="Login" />
        </form>
    );
}