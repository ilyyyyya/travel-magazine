import React, {useState} from 'react';
import classes from './signup.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import img from '../../assets/signup.jpg'
import {register} from '../../redux/authSlice';
import {URL} from "../../App.js";



const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${URL}/auth/register`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({username, email, password})
            })
            if(res.status !== 201){
                throw new Error('Wrong credentials!')
            }
            const data = await res.json()

            dispatch(register(data))
            navigate('/')
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000)
            console.error(error)
        }
    }


    return (
        <div className={classes.signUpContainer}>
            <div className={classes.signupWrapper}>
                <div className={classes.signupLeftSide}>
                    <img src={img} className={classes.leftImg} />
                </div>
                <div className={classes.signupRightSide}>
                    <h2 className={classes.title}>Регистрация</h2>
                    <form onSubmit={handleRegister} className={classes.signupForm}>
                        <input type="text" placeholder="Имя пользователя" onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
                        <button className={classes.submitBtn}>Зарегистрироваться</button>
                        <p>Уже есть аккаунт? <Link to='/login'>Войти</Link></p>
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
export default Signup;