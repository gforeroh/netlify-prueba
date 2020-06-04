import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Item = ({
    image,
    imageAlt,
    name,
    profession,
    description,
    logo,
    logoAlt,
    rating = 4
}) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        let _ratings = [];
        for (let index = 0; index < rating; index++) {
            _ratings.push(index+1);
        }
        setRatings([..._ratings]);
    }, [rating]);
    
    return (
        <div
            style={{borderRadius: "15px"}} 
            className="d-flex flex-column align-items-center bg-light p-3">
            <div
                style={{width: "120px", height: "120px", border: "5px solid #ff7060"}} 
                className="d-flex justify-content-center align-items-center rounded-circle mb-5">
                <img src={image} alt={imageAlt} className="img-fluid" />
            </div>
            <h4 className="text-center font-weight-bold color-1 mb-0">
                {name}
            </h4>
            <small className="text-center color-1 mb-0">
                {profession}
            </small>
            <p 
                style={{opacity: ".9"}}
                className="text-muted my-3">
                {description}
            </p>    
            <img src={logo} alt={logoAlt} className="img-fluid" />
            <div className="d-flex align-items-center mt-3 mr-auto">
                <img style={{width: "20px"}} src="/img/world.svg" alt="world" className="mr-md-2" />
                <small className="text-muted mr-3">Long Name Here</small>
                <img style={{width: "20px"}} src="/img/time.svg" alt="time" className="mr-md-2" />
                <small className="text-muted mr-4">1h ago</small>
            </div>
            <hr className="w-100 my-3" />
            <div className="d-flex">
                {
                    ratings.map((item, index) => (
                        <img
                            key={`name${index}`} 
                            src="/img/star.svg" alt="star" className="img-fluid mx-1 mx-md-2" />
                    ))
                }
            </div>
        </div>
    )
}

const Testimonial = ({
    testimonials
}) => {
    return (
        <>
            {/* Displayed in desk */}
            <div className="container-fluid bg-white pt-3">
                <section
                    className="container pb-5 d-none d-md-block">
                    <div className="row mt-5 pb-4">
                        {
                            testimonials.map((item, index) => {
                                return (
                                    <div
                                        key={`testimonial${index}`} 
                                        className="col-md-4">
                                        <Item 
                                            image={item.photo.image}
                                            imageAlt={item.photo.alt}
                                            name={item.name}
                                            profession={item.charge}
                                            description={item.description}
                                            logo={item.logo.image}
                                            logoAlt={item.logo.alt}
                                            rating={item.ranking}
                                            />
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
            {/* Displayed in mobile */}
            <div
                className="container bg-white d-block d-md-none px-3 px-sm-5 pt-3 pb-5">
                <div
                    className="container px-sm-5 py-3">
                    <Carousel showStatus={false} showThumbs={false} emulateTouch>
                        {
                            testimonials.map((item, index) => {
                                return(
                                    <div
                                        key={`testimonial2${index}`} 
                                        className="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                        <Item 
                                            image={item.photo.image}
                                            imageAlt={item.photo.alt}
                                            name={item.name}
                                            profession={item.charge}
                                            description={item.description}
                                            logo={item.logo.image}
                                            logoAlt={item.logo.alt}
                                            rating={item.ranking} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Testimonial;