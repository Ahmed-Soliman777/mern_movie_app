import { HelpCircle, LogOut, Search, Settings } from 'lucide-react';
import logo from '../assets/logo.png'
import { Link } from 'react-router';
import { useAuthStore } from './../store/authStore';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchMenu, setSearchMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchRef = useRef(null);
  const userRef = useRef(null)

  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.username)}`
    : ``;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODEwNWJkYzM1NjU3ODJhZTFhMDc4ZTBkNTUyNDM0MCIsIm5iZiI6MTcwNjg5NzE4MS45NCwic3ViIjoiNjViZDJmMWQxMWMwNjYwMTdiZDJkNGU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XrqiUPk3N9ywirF1gDyzIfdBBHsUpBmgUKKwUODQwqU',
    },
  };

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      options
    )
      .then((res) => res.json())
      .then((res) => setSearchMenu(res.results))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  async function handleLogout() {
    const { message } = await logout();
    toast.success(message, {
      duration: 1500,
    });
    setShowMenu(false);
  }



  const matchedMovies = searchMenu.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);


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
        <li className='cursor-pointer hover:text-[#e50914]'>Games</li>
        <li className='cursor-pointer hover:text-[#e50914]'>New & Popular</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Upcoming</li>
      </ul>

      <div className='flex items-center space-x-4 relative'>
        <div ref={searchRef} className="relative hidden md:inline-flex" onClick={() => setShowSearch(true)}>
          <input
            type="text"
            placeholder='Search....'
            className='bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className='absolute top-2 right-4 w-5 h-5' />

          {showSearch && searchQuery && (
            <div className="absolute top-12 left-0 bg-[#232323] text-white p-4 rounded-lg w-72 shadow-lg z-50">
              {matchedMovies.length > 0 ? (
                matchedMovies.map((movie) => (
                  <Link to={`/movie/${movie.id}`}>
                    <div
                      key={movie.id}
                      className="flex items-center space-x-3 mb-3 last:mb-0 cursor-pointer hover:bg-[#2c2c2c] p-2 rounded-lg transition overflow-hidden"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-sm">{movie.title}</h4>
                        <p className="text-xs text-gray-400">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-400">No movies found.</p>
              )}

            </div>
          )}
        </div>

        <Link to={!user ? '/signin' : '/ai-recommendations'}>
          <button className='capitalize bg-[#e50914] px-5 py-2 text-white cursor-pointer'>get AI movie picks</button>
        </Link>

        {!user ? (
          <Link to={'/signin'}>
            <button className='capitalize border border-[#333333] py-2 px-4 cursor-pointer'>sign in</button>
          </Link>
        ) : (
          <div
            ref={userRef}
            className="relative text-white"
          >
            <img
              src={avatarUrl}
              alt="user_avatar"
              className="w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
              onClick={() => {
                setShowMenu((prev) => !prev);
              }}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323]/95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">{user.username}</span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
                <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                  <HelpCircle className='w-5 h-5' /> Help Center
                </button>
                <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                  <Settings className='w-5 h-5' /> Settings
                </button>
                <button
                  className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'
                  onClick={handleLogout}
                >
                  <LogOut className='w-5 h-5' /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
