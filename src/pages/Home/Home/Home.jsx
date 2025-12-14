import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Banner from '../Banner/Banner';
import { useEffect } from 'react';
import PopularMeals from '../PopularMeals/PopularMeals';
import CustomerReviews from '../CustomerReviews/CustomerReviews';

const Home = () => {
    useEffect(() => {
        document.title = "Locchef";
    }, []);
    return (
        <div>
            <Banner></Banner>
            <PopularMeals></PopularMeals>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;