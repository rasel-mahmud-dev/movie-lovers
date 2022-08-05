import React from 'react'
import fullPath from "src/utils/fullPath"



function HeroCarousel() {
    return (

        <div class="carousel w-full">
            <div id="slide1" class="carousel-item relative w-full">

            <div className="caption absolute left-[10%] top-1/2 -translate-y-1/2">
                    <div className="row">
                        <h1 className='text-8xl text-white font-bold mb-4'>The Lost Girl</h1>
                        <h2 className="text-4xl text-white font-medium mb-3">Feel Good</h2>
                        <button className='btn  btn-primary mt-5'>Watch Now</button>
                    </div>
                </div>

                <img src={fullPath("images/slider-hm4-1.jpg")} class="w-full" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" class="btn btn-circle">❮</a>
                    <a href="#slide2" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" class="carousel-item relative w-full">
                
            <div className="caption absolute left-[10%] top-1/2 -translate-y-1/2">
                    <div className="row">
                        <h1 className='text-8xl text-white font-bold mb-4'>The Lost Girl</h1>
                        <h2 className="text-4xl text-white font-medium mb-3">Feel Good</h2>
                        <button className='btn  btn-primary mt-5'>Watch Now</button>
                    </div>
                </div>

                <img src={fullPath("images/slider-hm4-2.jpg")} class="w-full" />

                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" class="btn btn-circle">❮</a>
                    <a href="#slide1" class="btn btn-circle">❯</a>
                </div>
            </div>
            
        </div>
    )
}

export default HeroCarousel