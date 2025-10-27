import { Search } from 'lucide-react';
import logo from '../assets/logo.png'
import { Link } from 'react-router';
import { useAuthStore } from './../store/authStore';

export default function Navbar() {
  const { user } = useAuthStore()
  
  return (
    <nav className='bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap'>
      <Link to={"/"}>
        <img src={logo} alt="logo" className='w-24 cursor-pointer brightness-125' />
      </Link>
      <ul className="capitalize hidden xl:flex space-x-6">
        <li className='cursor-pointer hover:text-[#e50914]'>Home</li>
        <li className='cursor-pointer hover:text-[#e50914]'>TV Shows</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Movies</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Anime</li>
        <li className='cursor-pointer hover:text-[#e50914]'>games</li>
        <li className='cursor-pointer hover:text-[#e50914]'>new & popular</li>
        <li className='cursor-pointer hover:text-[#e50914]'>upcomming</li>
      </ul>
      <div className='capitalize flex items-center space-x-4 relative'>
        <div className="relative hidden md:inline-flex">
          <input type="text" placeholder='Search....' className='bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none' />
          <Search className='absolute top-2 right-4 w-5 h-5' />
        </div>
        <button className='capitalize bg-[#e50914] px-5 py-2 text-white cursor-pointer'>get AI movie picks</button>
        {!user ? <Link to={'/signin'}>
          <button className='capitalize border border-[#333333] py-2 px-4 cursor-pointer'>sign in</button>
        </Link> :
        
        
          <div className="text-white">{user.username}</div>
        }
      </div>
    </nav>
  )
}
