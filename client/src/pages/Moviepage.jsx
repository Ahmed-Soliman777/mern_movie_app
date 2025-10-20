import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from './../components/Loader';
import { Play } from 'lucide-react';

export default function Moviepage() {

  const { id } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODEwNWJkYzM1NjU3ODJhZTFhMDc4ZTBkNTUyNDM0MCIsIm5iZiI6MTcwNjg5NzE4MS45NCwic3ViIjoiNjViZDJmMWQxMWMwNjYwMTdiZDJkNGU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XrqiUPk3N9ywirF1gDyzIfdBBHsUpBmgUKKwUODQwqU'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(res => setMovieDetails(res))
      .catch(err => console.error(err));
  }, [id])


  if (!movieDetails) {
    return (
      <div className="flex justify-center items-center h-100">
        <Loader />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#181818] text-white'>
      <div className="relative h-[60vh] flex items-end" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`, backgroundPosition: 'center', backgroundSize: "cover" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-end p-8 gap-8">
          <img src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} alt='movie details img' className='rounded-lg shadow-lg w-48 hidden md:block' />
          <div className="">
            <h1 className="text-4xl font-bold mb-2">{movieDetails.title}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span className=''>⭐ {movieDetails.vote_average.toFixed(1)}</span>
              <span>{movieDetails.release_date}</span>
              <span>{movieDetails.runtime} min</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movieDetails.genres.map((genre, index) => (
                <span className='bg-gray-800 px-3 py-1  rounded-full text-sm' key={index}>{genre.name}</span>
              ))}
            </div>
            <p className="max-w-2xl text-gray-200">{movieDetails.overview}</p>
            <button className="capitalize flex justify-center items-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4">
              <Play className='mr-2 w-4 h-5 md:w-5 md:h-5' />watch now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
