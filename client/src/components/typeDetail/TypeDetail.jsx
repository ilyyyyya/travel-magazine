import React, {useEffect, useRef, useState} from 'react';
import classes from './typeDetails.module.css';
import {AiFillStar} from "react-icons/ai";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {getDatesInRange, isUnavailable} from "../../utils/dateFunc";
import {URL} from "../../App.js";

const TypeDetails = () => {

 const [pathDetails, setPathDetails] = useState("")
 const [startDate, setStartDate] = useState( "")
 const [endDate, setEndDate] = useState( "")
 const [username, setUsername] = useState("")
 const [error, setError] = useState(false)
 const [success, setSuccess] = useState(false)
 const [email, setEmail] = useState("")
 const {token} = useSelector((state) => state.auth)
 const {id} = useParams()
 const containerRef = useRef()
 const {user} = useSelector((state) => state.auth)

 useEffect(() => {
  const fetchPath = async () => {
   try {
    const res = await fetch(`${URL}/path/find/${id}`, {
     headers: {
      'Authorization': `Bearer ${token}`
     },
     method: "get"
    })

    const path = await res.json()
    console.log(path)
    setPathDetails(path)

   } catch (error) {
    console.error(error)
   }
  }
  fetchPath()
 }, [id])


 useEffect(() => {
  window.scrollTo(0, 0)
 }, [])

 const handleSubmit = async (e) => {
  e.preventDefault()

  const bookedDates = getDatesInRange(startDate, endDate)

  const isUnavailableDates = isUnavailable(pathDetails, bookedDates)

  if (isUnavailableDates) {

   const lastAvailableDate = new Date(pathDetails.unavailableDates[pathDetails.unavailableDates.length - 1])

   const lastAvailableDay = lastAvailableDate.getDate()

   const lastAvailableMonth = lastAvailableDate.getMonth()

   const formattedMonth = (lastAvailableMonth + 1) > 9 ? `${lastAvailableMonth + 1}` : `0${lastAvailableMonth + 1}`
   const formattedDay = lastAvailableDay > 9 ? `${lastAvailableDay}` : `0${lastAvailableDay}`

   const formattedDayAndMonth = `
       ${formattedDay}
       ${formattedMonth}`
   setError(formattedDayAndMonth)
   setTimeout(() => {
    setError(false)
   }, 2000)
   return
  }


  try {
   const res = await fetch(`${URL}/path/book/${id}`, {
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    },
    method: "PUT",
    body: JSON.stringify({ username, email, unavailableDates: bookedDates })
   })

   setSuccess(true)

   setTimeout(() => {
    setSuccess(false)
   }, 3500)

   const updatedPath = await res.json()
   setPathDetails(updatedPath)

  } catch (error) {
   console.error(error.message)
  }
 }


 return (
     <div ref={containerRef} className={classes.container}>
      <div className={classes.wrapper}>
       <div className={classes.left}>
        <div className={classes.imgWrapper}>
         <img src={`${URL}/images/${pathDetails?.photo}`} alt=""/>
        </div>
       </div>
       <div className={classes.right}>
        <h2 className={classes.title}>{pathDetails.title}</h2>
        <p className={classes.type}>Тип маршрута: <span>{pathDetails.type}</span></p>
        <div className={classes.review}>Оценки: <AiFillStar className={classes.icon}/> {pathDetails.review}</div>
        <p className={classes.desc}>
         <span>Описание: </span>
         {pathDetails.description}
        </p>
        <div className={classes.priceAndCountry}>
         <span>Город: {pathDetails.place}</span>
         <span>
          <span className={classes.price}>{pathDetails.price}  ₽</span>
         </span>
        </div>
        <form className={classes.typeDetailForm} onSubmit={handleSubmit}>
         <h3 className={classes.subtitle}>Заполните форму</h3>
         <input value={username} type="text" placeholder="Имя" onChange={(e) => setUsername(e.target.value)}/>
         <input value={email} type="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)}/>
         <div style={{display: 'flex', gap: '16px'}}>
          <input value={startDate} type="date" onChange={(e) => setStartDate(e.target.value)}/>
          <input value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)}/>
         </div>
         {user ?
             <>
              <button type="submit" className={classes.bookNow}>Забронировать</button>
             </>
             :
             <>
              <Link to='/login' className={classes.login}>Войти</Link>
             </>
         }
        </form>
        {error &&
            <div className={classes.errorMessage}>
             Ваша дата указана в забронированном диапазоне!
             Последний забронированный день - {error}
            </div>
        }
        {success &&
            <div className={classes.successMessage}>
             Успех! Вы забронировали маршрут с {startDate} по {endDate}
            </div>
        }
       </div>
      </div>
     </div>
 )
}
export default TypeDetails;