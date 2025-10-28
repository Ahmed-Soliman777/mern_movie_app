import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link } from 'react-router';

export default function RecommendedMovies({ moviesTitles }) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODEwNWJkYzM1NjU3ODJhZTFhMDc4ZTBkNTUyNDM0MCIsIm5iZiI6MTcwNjg5NzE4MS45NCwic3ViIjoiNjViZDJmMWQxMWMwNjYwMTdiZDJkNGU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XrqiUPk3N9ywirF1gDyzIfdBBHsUpBmgUKKwUODQwqU'
        }
    };

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchMovie(title) {
        const encodedTitle = encodeURIComponent(title)
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`

        try {
            const res = await fetch(url, options)
            const data = await res.json()
            return data.results?.[0] || null
        } catch (error) {
            console.log(error);
            return null
        }
    }

    useEffect(() => {
        async function loadMovies() {
            setLoading(true)
            const results = await Promise.all(moviesTitles.map((title) => fetchMovie(title)))
            setMovies(results.filter(Boolean))
            setLoading(false)
        }
        if (moviesTitles?.length) {
            loadMovies()
        }
    }, [moviesTitles])

    if (loading) {
        return <Loader />
    }

    console.log(movies);


    return (
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {movies.map(movie => (

                <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className='bg-[#232323] rounded-lg overflow-hidden'
                >
                    {movie.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className='w-full h-48 object-cover' />
                    ) : (
                        <>No Image</>
                    )}

                    <div className="p-2">
                        <h3 className="text-sm font-semibold text-white truncate">{movie.title}</h3>
                        <p className="text-xs text-gray-400">{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
                    </div>
                </Link>
            )
            )}
        </div>
    )
}
