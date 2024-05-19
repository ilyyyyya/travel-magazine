import React, {useState} from 'react';
import classes from './navbar.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authSlice";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset !== 0)
        return () => (window.onscroll = null)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <Link to='/'>
                        <h2 className={classes.title}>Журнал путешествий</h2>
                    </Link>
                </div>
                <div className={classes.center}>
                    <ul className={classes.list}>
                        <li className={classes.listItem}><a href='#'>Главная</a></li>
                        <li className={classes.listItem}><a href='#about'>О нас</a></li>
                        <li className={classes.listItem}><a href='#services'>Маршруты</a></li>
                        <li className={classes.listItem}><a href='#suggested'>Рекомендации</a></li>
                    </ul>
                </div>
                <div className={classes.right}>
                    {user ?
                        <>
                        {user.isAdmin && <Link to='/create'>Добавить</Link>}
                            <p className={classes.username}>Пользователь:{user.username}</p>
                            <span className={classes.logout} onClick={handleLogout}>Выход</span>
                        </>
                        :
                        <>
                            <Link to='/login' className={classes.login}>Войти</Link>
                            <Link to='/signup' className={classes.signup}>Регистрация</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;