import React, { useEffect, useState } from 'react'
import { Bookmark, Play } from 'lucide-react'

export default function Hero() {
  const [movie, setMovie] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODEwNWJkYzM1NjU3ODJhZTFhMDc4ZTBkNTUyNDM0MCIsIm5iZiI6MTcwNjg5NzE4MS45NCwic3ViIjoiNjViZDJmMWQxMWMwNjYwMTdiZDJkNGU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XrqiUPk3N9ywirF1gDyzIfdBBHsUpBmgUKKwUODQwqU'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIndex]);
        }
      })
      .catch(err => console.error(err));
  }, []);
  
  if (!movie) {
    return <p className='text-white'>Loading...</p>;
  }

  return (
    <div className='text-white relative'>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className='w-full rounded-2xl h-[480px] object-center object-cover'
      />
      <div className="absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">{movie.title}</h1>
        <div className="flex space-x-2 md:space-x-4">
          <button className="capitalize flex justify-center items-center bg-white hover:bg-red-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
            <Bookmark className='mr-2 w-4 h-5 md:w-5 md:h-5' />save for later
          </button>
          <button className="capitalize flex justify-center items-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
            <Play className='mr-2 w-4 h-5 md:w-5 md:h-5' />watch now
          </button>
        </div>
      </div>
    </div>
  );
}
  