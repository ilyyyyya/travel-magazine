import React from 'react';
import classes from './home.module.css';
import About from '../about/About'
import Types from "../types/Types";
import SuggestedPlaces from "../suggestedPlaces/SuggestedPlaces";


const Home = () => {
    return (
        <div>
            <About />
            <Types />
            <SuggestedPlaces />
        </div>
    );
}
export default Home;