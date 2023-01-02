import styles from "./register.module.css";

export default function Register() {
    return (
        <form className={styles.register}>
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Enter your username" 
                onChange={(e) => () => {}}>
            </input>
            <select 
                name="select-security-question"
                onChange={(e) => () => {}}>
                <option defaultChecked
                    value=""
                    >Select Security Question
                </option>
            </select>
            <input 
                type="text" 
                placeholder="Enter security question answer" 
                onChange={(e) => () => {}}>
            </input>
            <input 
                type="password" 
                placeholder="Enter password"
                autoComplete="on"
                onChange={(e) => () => {}}>
            </input>
            <input 
                type="password" 
                placeholder="Repeat password"
                autoComplete="on"
                onChange={(e) => () => {}}>
            </input>

            <input type="submit" value="Register"/>
        </form>
    );
}