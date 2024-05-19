import React, {useEffect, useState} from 'react'
import classes from './types.module.css';
import {Link, useNavigate} from "react-router-dom";
import img1 from '../../assets/img2.jpg'
import img2 from '../../assets/img3.jpg'
import img3 from '../../assets/img4.jpg'
import img4 from '../../assets/img5.jpg'
import {URL} from "../../App.js";

const Types = () => {
    const [types, setTypes] = useState([])
    // const {token} = useSelector((state) => state.auth)


    const navigate = useNavigate()

    const typeTranslations = {
        mountain: 'Горы',
        forest: 'Лес',
        sea: 'Море',
        cruise: 'Круиз'
    }

    useEffect(() => {
        const fetchTypes = async() => {
            try {
                const res = await fetch(`${URL}/path/find/types`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const types = await res.json()
                console.log(types)
                setTypes(types)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTypes()
    }, [])

    return (
        <section id="services" className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h5 className={classes.subtitle}>Маршруты для путешествий</h5>
                    <h2 className={classes.title}>Какой тип маршрута вы хотите выбрать?</h2>
                </div>
                <div className={classes.types}>
                    {Object.entries(types).map(([key, value], index) => (
                        <Link to={`/types/${key}`} key={key + value} className={classes.type} >
                            <div className={classes.imgWrapper}>
                                {index === 0 && <img src={img1} alt=""/>}
                                {index === 1 && <img src={img2} alt=""/>}
                                {index === 2 && <img src={img3} alt=""/>}
                                {index === 3 && <img src={img4} alt=""/>}
                            </div>
                            <span>{value} {typeTranslations[key]}</span>
                        </Link>
                    ))}
                </div>
                </div>
        </section>
    )
}

export default Types;