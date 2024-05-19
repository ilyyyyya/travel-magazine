import React, {useState} from 'react';
import classes from './login.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../redux/authSlice";
import {URL} from "../../App.js";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${URL}/auth/login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({email, password})
            })
            if(res.status === 404){
                throw new Error("Wrong credentials")
            }

            const data = await res.json()
            dispatch(login(data))
            navigate('/')

        } catch (error) {
            setError(prev => true)
            setTimeout(() => {
                setError(prev => false)
            }, 1000)
        }
    }

    return (
        <div className={classes.loginContainer}>
            <div className={classes.loginWrapper}>
                <div className={classes.loginSide}>
                    <h2 className={classes.title}>Авторизация</h2>
                    <form onSubmit={handleLogin} className={classes.loginForm}>
                        <input type="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                        <button className={classes.submitBtn}>Войти</button>
                        <p>Нет аккаунта? <Link to='/signup'>Регистрация</Link></p>
                    </form>
                    {error &&
                        <div className={classes.errorMessage}>
                            Неверные учетные данные! Попробуйте использовать другие.
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Login;