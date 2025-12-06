import React from 'react';
import ThemeToggle from '../../../components/ThemeToggle';

const Navbar = () => {
    return (
        <div className='flex justify-center items-center gap-5'>
            LocalChefBazaar
            <ThemeToggle></ThemeToggle>
        </div>
    );
};

export default Navbar;