import React from 'react'
import { Navbar } from './Navbar'
import { BlogList } from './BlogList'

export const Blog = (props : {}) => {
    return (
        <div className='flex flex-col items-center justify-between'>
            <Navbar />
            <BlogList />
        </div>
    )
}
