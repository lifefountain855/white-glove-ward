import {Link} from 'react-router-dom'

export default function NotFound(){
    return (
        <div className="m-5 my-15 relative flex items-center justify-center">
            <div className="flex flex-col w-[95vw] h-[50vh] bg-off-white p-10 shadow-md rounded-3xl items-center justify-between">
                <h1 className="text-6xl">404</h1>
                <h2 className="text-3xl text-center">we cant find the page you're looking for...</h2>
                <Link to='/' className="text-center text-xl">
                go home
                </Link>
            </div>
        </div>
    )
}