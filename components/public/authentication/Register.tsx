import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./register.module.css";

interface RegisterUserPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordRepeat: string
}

export default function Register() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");

    const registerUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload: RegisterUserPayload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            passwordRepeat: passwordRepeat
        };
    }

    return (
        <form className={styles.register} onSubmit={registerUser}>
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Enter your first name" 
                onChange={(e) => setFirstName(e.target.value)}>
            </input>
            <input 
                type="text" 
                placeholder="Enter your last name" 
                onChange={(e) => setLastName(e.target.value)}>
            </input>
            <input 
                type="email" 
                placeholder="Enter your email" 
                onChange={(e) => setEmail(e.target.value)}>
            </input>
            <input 
                type="password" 
                placeholder="Enter password"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}>
            </input>
            <input 
                type="password" 
                placeholder="Repeat password"
                autoComplete="on"
                onChange={(e) => setPasswordRepeat(e.target.value)}>
            </input>

            <input type="submit" value="Register"/>
        </form>
    );
}