import { Link } from 'react-router'
import logo from '../assets/logo.png'
export default function AuthNavbar() {
    return (
        <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-black/75 fixed top-0 left-0 z-50">
            <Link to={"/"}>
                <img src={logo} alt="logo" className='w-24 cursor-pointer brightness-125' />
            </Link>
        </nav>
    )
}
