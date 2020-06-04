import React, {useEffect, useState} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Item = ({
    image, alt,
    url,
    width = "130 px", height = "130px",
    style,
    className = "img-fluid p-1 p-md-0"
}) => {
    return (
        <img 
            style={style}
            src={image} 
            alt={alt} 
            width={width}
            height={height}
            className={`rounded-circle ${className}`} />
    )
}

const ITEMS_PER_SLIDE = 6;
const ITEMS_PER_SLIDE_MOBILE = 2;

const CarouselLogos = ({
    logos
}) => {
    const [slides, setSlides] = useState([]);
    const [slidesMobile, setSlidesMobile] = useState([]);

    useEffect(() => {
        let _slides = [];
        let _slidesMobile = [];
        for (let index = 0; index < logos.length; index = index+ITEMS_PER_SLIDE) {
            _slides.push(logos.slice(index, index+ITEMS_PER_SLIDE))
        }
        for (let index = 0; index < logos.length; index = index+ITEMS_PER_SLIDE_MOBILE) {
            _slidesMobile.push(logos.slice(index, index+ITEMS_PER_SLIDE_MOBILE))
        }
        setSlides(_slides);
        setSlidesMobile(_slidesMobile);
    }, []);

    const goTo = _url => {
        if(window)
            window.open(
                _url,
            '_blank' // <- This is what makes it open in a new window.
          );
    }

    return (
        <div
            id="clients" 
            className="bg-white">
            {/* DESKTOP */}
            <div className="d-none d-md-block">
                <Carousel showStatus={false} showThumbs={false} emulateTouch>
                    {
                        slides.map((slide, index) => (
                            <div
                                key={`slide${index}`} 
                                className="container py-md-3">
                                <div className="row d-flex justify-content-center">
                                    {
                                        slide.map((item, index2) => {
                                            return (
                                                <div
                                                    key={`slide-item${index}${index2}`}
                                                    onClick={() => goTo(item.url)} 
                                                    className="col-md-2 c-pointer">
                                                    <Item 
                                                        image={item.icon.image}
                                                        alt={item.icon.alt}
                                                        url={item.url} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
            
            {/* MOBILE */}
            <div className="d-block d-md-none pb-3">
                <Carousel showStatus={false} showThumbs={false} emulateTouch>
                    {
                        slidesMobile.map((slide, index) => (
                            <div
                                key={`slidemo${index}`} 
                                className="container">
                                <div className="row no-gutters d-flex justify-content-center">
                                    {
                                        slide.map((item, index2) => (
                                            <div
                                                key={`slide-item-mobile${index}${index2}`} 
                                                className="col-6 d-flex justify-content-center c-pointer"
                                                onClick={() => goTo(item.url)}>
                                                <Item 
                                                    style={{width: "180px", height: "180px"}}
                                                    className=""
                                                    image={item.icon.image}
                                                    alt={item.icon.alt}
                                                    url={item.url} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselLogos;