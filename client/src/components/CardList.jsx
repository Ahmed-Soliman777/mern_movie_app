import cardImage from '../assets/cardimg.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CardList() {
    const data = [
        {
            id: 1,
            title: 'card 1',
            description: 'description for card 1',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            title: 'card 2',
            description: 'description for card 2',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            title: 'card 3',
            description: 'description for card 3',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 1,
            title: 'card 1',
            description: 'description for card 1',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            title: 'card 2',
            description: 'description for card 2',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            title: 'card 3',
            description: 'description for card 3',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 1,
            title: 'card 1',
            description: 'description for card 1',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            title: 'card 2',
            description: 'description for card 2',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            title: 'card 3',
            description: 'description for card 3',
            imageUrl: 'https://via.placeholder.com/150'
        },
    ]
    return (
        <div className='text-white md:px-4'>
            <h2 className='capitalize pt-10 pb-5 text-lg font-medium'>upcomming</h2>
            <Swiper slidesPerView={'auto'} spaceBetween={10} className="mySwiper">
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index} className='max-w-72'>
                            <img src={cardImage} alt="card image" className='h-44 w-full object-center object-cover' />
                            <p className='text-center pt-2'>A very good movie</p>
                        </SwiperSlide>
                    ))
                }</Swiper>
        </div>
    )
}
