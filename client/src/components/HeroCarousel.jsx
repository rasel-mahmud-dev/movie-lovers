import React from 'react'
import fullPath from "src/utils/fullPath"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

function HeroCarousel() {


    const items = [
        { 
            caption: ()=> (
                <div>
                    <div className="caption absolute left-[10%] top-1/2 -translate-y-1/2">
                    <div className="row">
                        <h1 className='text-8xl text-white font-bold mb-4'>The Lost Girl</h1>
                        <h2 className="text-4xl text-white font-medium mb-3">Feel Good</h2>
                        <button className='btn  btn-primary mt-5'>Watch Now</button>
                    </div>
                    </div>
                </div>
            ),
            image: "images/slider-hm4-1.jpg" 
        },
        { 
            caption: ()=> (
                <div>
                    <div className="caption absolute left-[10%] top-1/2 -translate-y-1/2">
                    <div className="row">
                        <h1 className='text-8xl text-white font-bold mb-4'>The Lost Girl</h1>
                        <h2 className="text-4xl text-white font-medium mb-3">Feel Good</h2>
                        <button className='btn  btn-primary mt-5'>Watch Now</button>
                    </div>
                    </div>
                </div>
            ),
            image: "images/slider-hm4-2.jpg"
        },

    ]



    return (

        <div className="carousel w-full">


            <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    { items.map(item=>(
                        <SwiperSlide>
                            
                            <div>
                                <img src={fullPath(item.image)} alt="" />
                            </div>
                            { item.caption() }

                        </SwiperSlide>
                    )) }
                </Swiper>


            {/* <div id="slide1" className="carousel-item relative w-full">

            <div className="caption absolute left-[10%] top-1/2 -translate-y-1/2">
                    <div className="row">
                        <h1 className='text-8xl text-white font-bold mb-4'>The Lost Girl</h1>
                        <h2 className="text-4xl text-white font-medium mb-3">Feel Good</h2>
                        <button className='btn  btn-primary mt-5'>Watch Now</button>
                    </div>
                </div>

                <img src={fullPath("images/slider-hm4-1.jpg")} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                
            <div className="caption absolute left-[10%] top-1/2 -translate-y-1/2">
                    <div className="row">
                        <h1 className='text-8xl text-white font-bold mb-4'>The Lost Girl</h1>
                        <h2 className="text-4xl text-white font-medium mb-3">Feel Good</h2>
                        <button className='btn  btn-primary mt-5'>Watch Now</button>
                    </div>
                </div>

                <img src={fullPath("images/slider-hm4-2.jpg")} className="w-full" />

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div> */}
            
        </div>
    )
}

export default HeroCarousel