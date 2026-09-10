import {Link} from 'react-router-dom'
import{ArrowLeft} from 'lucide-react'

export default function NotFound(){
    return (
        <div className="m-5 my-15 relative flex items-center justify-center">
            <div className="flex flex-col w-[95vw] h-[80vh] bg-off-white p-10 shadow-md rounded-3xl items-center justify-between">
                <h1 className="text-6xl lg:text-9xl text-secondary">404</h1>
                <h2 className="text-2xl md:text-3xl text-center">we cant find the page you're looking for...</h2>
                <Link to='/' className="group btn-accent text-center text-xl flex flex-row">
                    <ArrowLeft className='group-hover:-translate-x-2 transition-transform duration-250'/>
                    <span>go home</span>
                </Link>
            </div>
        </div>
    )
}