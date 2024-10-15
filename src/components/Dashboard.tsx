import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'

const URL = "http://localhost:3000"

export const Dashboard = (props : {}) => {
    const [data, setData] = useState({
        flag: ""
    })

    useEffect(() => {
        fetch(URL + "/api/dashboard", {
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(err))
    }, [])


    return (
        <div className='flex flex-col items-center justify-between'>
            <Navbar />
            Welcome admin. Here is your admin only info: {data.flag}
        </div>
    )
}
