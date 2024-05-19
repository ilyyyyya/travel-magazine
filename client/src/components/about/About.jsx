import React, {useState} from 'react';
import classes from './about.module.css';
import img1 from '../../assets/img1.jpg';
import {GiPalmTree} from "react-icons/gi";
import {BiHappy} from "react-icons/bi";
import {FaUmbrellaBeach} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { search } from "../../redux/searchSlice"

const About = () => {
    const [type, setType] = useState("")
    const [place, setPlace] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const validTypes = ['cruise', 'mountain', 'forest', 'sea'];

    const handleSearch = () => {
        if (validTypes.includes(type)) {
            dispatch(search({type, place}));
            const encodedPlace = encodeURIComponent(place);
            navigate(`/types/${type}/${encodedPlace}`);
        } else {
            alert('Выберите определенный тип маршрута.');
        }
    }

    return (
        <section className={classes.container} id='about'>
            <div className={classes.wrapper}>
                <div className={classes.imgWrapper}>
                    <img src={img1} alt=""/>
                </div>
                <div className={classes.titles}>
                    <h5 className={classes.subtitle}>Путешествия ждут тебя</h5>
                    <h2 className={classes.title}>
                        Бронируй маршруты прямо сейчас <span> по скидке 10%</span>
                    </h2>
                </div>
                <div className={classes.inputsContainer}>
                    <div className={classes.inputContainer}>
                        <span>Тип <GiPalmTree className={classes.icon}/></span>
                        <select onChange={(e) => setType(e.target.value)}>
                            <option>Выбирете тип путешествия</option>
                            <option value="cruise">Круиз</option>
                            <option value="mountain">Горы</option>
                            <option value="forest">Леса</option>
                            <option value="sea">Моря</option>
                        </select>
                    </div>
                    <div className={classes.inputContainer}>
                        <span>Город <BiHappy className={classes.icon}/></span>
                        <input type="text"  onChange={(e) => setPlace(e.target.value)}/>
                    </div>
                    <button onClick={handleSearch} className={classes.bookBtn}>Поиск</button>
                </div>
            </div>
        </section>
    );
}
export default About;