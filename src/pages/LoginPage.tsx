import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorizeUser } from "../api/ApiUser";
import "../css/Login.css";
import user from "../images/user.png";
import padlock from "../images/padlock.png";
import CryptoJS from "crypto-js";

const hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password).toString();
};

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const hashedPassword = hashPassword(password);

        authorizeUser(username, hashedPassword)
            .then(({status, data}) => {
                if (status !== 200) {
                    setErrorMessage("Неправильный логин или пароль");
                    throw new Error("Error! User is not registered")
                }
                localStorage.setItem('access_token', data.access_token)
                navigate("/not_processed")
            })
            .catch(err => {
                alert(err);
                console.log(err)
            })
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <div className="input-wrapper">
                            <img src={user} alt="User Icon" className="input-icon" />
                            <input
                                type="text"
                                placeholder="ПОЛЬЗОВАТЕЛЬ"
                                className="input-field"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-wrapper">
                            <img src={padlock} alt="User Icon" className="input-icon padlock" />
                            <input
                                type="password"
                                placeholder="ПАРОЛЬ"
                                className="input-field padlock"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="login-button">ВОЙТИ</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
