import React, {useEffect, useState} from 'react';
import classes from './type.module.css';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AiFillStar} from "react-icons/ai";
import {URL} from "../../App.js";

const Type = () => {

 const [estates, setEstates] = useState([])
 const {type} = useParams();
 const {token} = useSelector((state) => state.auth)

 const typeTranslations = {
  mountain: 'Горам',
  forest: 'Лесам',
  sea: 'Морям',
  cruise: 'Круизам'
 };

console.log(type)
 useEffect(() => {
  const fetchTypePaths = async () => {
   try {
    const res = await fetch(`${URL}/path?type=${type}`, {
     headers: {
      "Authorization": `Bearer ${token}`
     }
    })
    const estates = await res.json()
    setEstates(estates)
   } catch (error) {
    console.error(error)
   }
  }
  fetchTypePaths()
 }, [type])

 console.log(estates)
 return (
     <div className={classes.container}>
      <div className={classes.wrapper}>
       <div className={classes.titles}>
        <h5 className={classes.subtitle}>Маршруты по {typeTranslations[type]}</h5>
        <div className={classes.places}>
         {estates.map((estate) => (
             <Link to={`/typeDetail/${estate._id}`} className={classes.place} key={estate._id}>
              <div className={classes.imgWrapper}>
               <img src={`${URL}/images/${estate.photo}`} alt="" />
              </div>
              <div className={classes.titleAndReview}>
               <span>{estate.title}</span>
               <span className={classes.review}><AiFillStar className={classes.icon} />{estate.review}</span>
              </div>
              <div className={classes.countryAndPrice}>
               <span>Country: <span>{estate.place}</span></span>
               <span className={classes.price}>{estate.price} ₽</span>
              </div>
             </Link>
         ))}
        </div>
       </div>
      </div>
     </div>
 )
}
export default Type;