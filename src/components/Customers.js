import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Item = ({
    image, alt,
    style = { maxWidth: "120px" },
    className = "img-fluid p-1 p-md-0"
}) => {
    return (
        <img
            style={style}
            src={image}
            alt={alt}
            className={`${className} to-scale-with-animation`} />
    )
}

const ITEMS_PER_SLIDE = 12;

const Customers = ({
    logos
}) => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        let _slides = [];
        for (let index = 0; index < logos.length; index = index + ITEMS_PER_SLIDE) {
            _slides.push(logos.slice(index, index + ITEMS_PER_SLIDE))
        }
        setSlides(_slides);
    }, []);

    return (
        <div
            className="bg-white">
            {/* DESKTOP */}
            <Carousel showStatus={false} showThumbs={false} emulateTouch>
                {
                    slides.map((slide, index) => (
                        <div
                            key={`slide${index}`}
                            className="container pb-5 py-md-3">
                            <div className="row no-gutters">
                                {
                                    slide.map((item, index2) => {
                                        return (
                                            <div
                                                key={`slide-item${index}${index2}`}
                                                className="d-flex col-4 col-md-3">
                                                <div className="mx-auto ml-md-auto">

                                                <Item
                                                    image={item.image.image}
                                                    alt={item.image.alt}
                                                />
                                                </div>
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
    )
}

export default Customers;