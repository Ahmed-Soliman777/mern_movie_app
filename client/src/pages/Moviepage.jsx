import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Loader from './../components/Loader';
import { Play } from 'lucide-react';

export default function Moviepage() {

  const { id } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [trailer, setTrailer] = useState(null)

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

    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setRecommendations(res?.results || []))
      // .then(res => console.log(res.results))
      .catch(err => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        const trailerVideo = res.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        setTrailer(trailerVideo?.key || null);
      })
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
            <Link to={trailer ? `https://www.youtube.com/watch?v=${trailer}` : '#'} target="_blank" rel="noopener noreferrer">
              <button className="capitalize flex justify-center items-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4">
                <Play className='mr-2 w-4 h-5 md:w-5 md:h-5' />watch now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="capitalize text-2xl font-semibold mb-4">details</h2>
        <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-3">
              <li className=''>
                <span className='font-semibold text-white'>Status : </span>
                <span className='ml-2'>{movieDetails.status}</span>
              </li>
              <li className=''>
                <span className='font-semibold text-white'>Release Date : </span>
                <span className='ml-2'>{movieDetails.release_date}</span>
              </li>
              <li className=''>
                <span className='font-semibold text-white'>Original Language : </span>
                <span className='ml-2'>{movieDetails.original_language?.toUpperCase()}</span>
              </li>
              <li className=''>
                <span className='font-semibold text-white'>Budget : </span>
                <span className='ml-2'>{movieDetails.budget ? `$${movieDetails.budget.toLocaleString()}` : 'N/A'}</span>
              </li>
              <li className=''>
                <span className='font-semibold text-white'>Revenue : </span>
                <span className='ml-2'>{movieDetails.revenue ? `$${movieDetails.revenue.toLocaleString()}` : 'N/A'}</span>
              </li>
              <li className=''>
                <span className='font-semibold text-white'>Production Companies : </span>
                <span className='ml-2'>{movieDetails.production_companies && movieDetails.production_companies.length > 0 ? movieDetails.production_companies.map((c) => c.name).join(", ") : "N/A"}</span>
              </li>
              <li className=''>
                <span className='font-semibold text-white'>Countries : </span>
                <span className='ml-2'>{movieDetails.production_countries && movieDetails.production_countries.length > 0 ? movieDetails.production_countries.map((c) => c.name).join(", ") : "N/A"}</span>
              </li>
              <li className=''>
                <span className='font-semibold text-white'>Spoken Languages : </span>
                <span className='ml-2'>{movieDetails.spoken_languages && movieDetails.spoken_languages.length > 0 ? movieDetails.spoken_languages.map((c) => c.english_name).join(", ") : "N/A"}</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Tagline</h3>
            <p className="italic text-gray-400 mb-6">{movieDetails.tagline || "No tagline avaliable."}</p>
            <h3 className="font-semibold text-white mb-2">Overview</h3>
            <p className="text-gray-200">{movieDetails.overview}</p>
          </div>
        </div>
      </div>

      {recommendations?.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">You might also like...</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recommendations?.slice(0, 10).map((item) => (
              <div className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition" key={item.id}>
                <Link to={`/movie/${item.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} className='w-full h-48 object-cover' />
                  <div className="p-2">
                    <h3 className='text-sm font-semibold'>{item.title}</h3>
                    <span className='text-xs text-gray-400'>{item.release_date?.slice(0, 4)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
