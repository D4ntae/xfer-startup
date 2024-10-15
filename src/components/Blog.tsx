import { Navbar } from './Navbar'
import { BlogList } from './BlogList'

export const Blog = () => {
    return (
        <div className='flex flex-col items-center justify-between'>
            <Navbar />
            <BlogList />
        </div>
    )
}
