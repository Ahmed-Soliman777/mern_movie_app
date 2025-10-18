import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router'
import "swiper/css";

export default function CardList({ title, category }) {

    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODEwNWJkYzM1NjU3ODJhZTFhMDc4ZTBkNTUyNDM0MCIsIm5iZiI6MTcwNjg5NzE4MS45NCwic3ViIjoiNjViZDJmMWQxMWMwNjYwMTdiZDJkNGU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XrqiUPk3N9ywirF1gDyzIfdBBHsUpBmgUKKwUODQwqU'
        }
    };


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                setData(res.results)
            })
            .catch(err => console.error(err));
    }, [])

    console.log(data);



    return (
        <div className='text-white md:px-4'>
            <h2 className='capitalize pt-10 pb-5 text-lg font-medium'>{title}</h2>
            <Swiper slidesPerView={'auto'} spaceBetween={10} className="mySwiper">
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index} className='max-w-72'>
                            <Link to={`/movie/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt="card image" className='h-44 w-full object-center object-cover' />
                                <p className='text-center pt-2'>{item.original_title}</p>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
