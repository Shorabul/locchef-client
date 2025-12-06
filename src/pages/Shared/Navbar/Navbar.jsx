import React from 'react';
import ThemeToggle from '../../../components/ThemeToggle';
import { Link, NavLink } from 'react-router';
import Container from '../../../components/Shared/Container';
import { IoMenuSharp } from "react-icons/io5";

const Navbar = () => {
    const links = <div
        className='text-black/90 dark:text-white flex items-center gap-5 font-semibold'
    >
        <NavLink className='px-4 py-3 hover:bg-neutral-100 transition'>Home</NavLink>
        <NavLink className='px-4 py-3 hover:bg-neutral-100 transition'>Meals</NavLink>
        <NavLink className='px-4 py-3 hover:bg-neutral-100 transition'>Dashboard</NavLink>
        <NavLink
            className='bg-[#ffcc00] text-white py-2 px-3 rounded-md'
            type='button'
        >Login</NavLink>
        <NavLink
            className='bg-[#ffcc00] text-white py-2 px-3 rounded-md'
            type='button'>Register</NavLink>

    </div>
    return (
        <div className='fixed w-full z-10 shadow-sm'>
            <div className='py-4'>
                <Container>
                    <div className='w-full flex flex-row  items-center justify-between gap-3 md:gap-0'>
                        <Link
                            to='/'
                        >
                            <img
                                width='100' height='100'
                                src="/Local-Chef's-bazaar.png" alt="" />
                        </Link>
                        <div className='hidden md:block'>
                            {links}
                        </div>
                        <div className='block md:hidden dark:text-white'>
                            <IoMenuSharp />
                        </div>
                        <ThemeToggle></ThemeToggle>
                        {/* menu */}

                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;