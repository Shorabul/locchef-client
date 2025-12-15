import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Banner from '../Banner/Banner';
import { useEffect } from 'react';
import PopularMeals from '../PopularMeals/PopularMeals';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import HowToOrder from '../HowToOrder/HowToOrder';
import NewsletterBanner from '../NewsletterBanner/NewsletterBanner';

const Home = () => {
    useEffect(() => {
        document.title = "Locchef";
    }, []);
    return (
        <div>
            <Banner></Banner>
            <PopularMeals></PopularMeals>
            <HowToOrder></HowToOrder>
            <CustomerReviews></CustomerReviews>
            <NewsletterBanner></NewsletterBanner>
        </div>
    );
};

export default Home;