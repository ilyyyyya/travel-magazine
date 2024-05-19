import React, {useEffect, useState} from 'react';
import classes from './suggestedplaces.module.css';
import {AiFillStar} from "react-icons/ai";
import {Link} from "react-router-dom";
import img from "../../assets/img1.jpg";
import {useSelector} from "react-redux";
import {URL} from "../../App.js";

const SuggestedPlaces = () => {

    const [estates, setEstates] = useState([])
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
        const fetchTypePaths = async () => {
            try {
                const res = await fetch(`${URL}/path`, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                })
                const estates = await res.json()

                const filteredEstates = estates.filter(estate =>
                    estate.review >= '4.7'
                );

                setEstates(filteredEstates)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTypePaths()
    }, [])


    return (
        <section id='suggested' className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h5 className={classes.subtitle}>Самые посещаемые маршруты</h5>
                    <h2 className={classes.title}>
                        Любимые маршруты наших клиентов
                    </h2>
                </div>
                <div className={classes.places}>
                    {estates.map(suggestedPlace => (
                        <Link to={`/typeDetail/${suggestedPlace._id}`} className={classes.place} key={suggestedPlace._id}>
                            <div className={classes.imgWrapper}>
                                <img src={`${URL}/images/${suggestedPlace.photo}`} alt="" />
                            </div>
                            <div className={classes.titleAndReview}>
                                <span>{suggestedPlace.title}</span>
                                <span className={classes.review}><AiFillStar className={classes.icon} />{suggestedPlace.review}</span>
                            </div>
                            <div className={classes.countryAndPrice}>
                                <span>Город: <span>{suggestedPlace.place}</span></span>
                                <span className={classes.price}>{suggestedPlace.price} ₽</span>
                            </div>
                        </Link>
                    ))}
                </div>
                </div>
        </section>
)
}

export default SuggestedPlaces;