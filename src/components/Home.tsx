import React from 'react'
import { Navbar } from "./Navbar"
import LandingPage from './LandingPage'

export const Home = (props : {}) => {
    return (
        <div className='w-full'>
            <Navbar />
            <LandingPage />
        </div>
    )
}
