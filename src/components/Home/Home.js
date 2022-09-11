import React from 'react'
import NavbarC from '../Navbar/NavbarC'
import Rides from '../Rides/Rides'

const Home = () => {
    return (
        <>
            <NavbarC active='home' />
            <Rides />
        </>
    )
}

export default Home