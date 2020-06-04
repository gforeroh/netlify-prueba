import React from 'react'
import Feature2 from './Feature2';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { getImage } from '../utils';

const Item = ({
    image,
    alt,
    title,
    description
}) => {
    return (
        <div className="d-flex flex-column">
            <div
                style={{width: "120px", height: "120px"}} 
                className="d-flex align-items-center bg-white rounded-circle mb-4 mb-md-3 mr-auto mx-auto ml-md-3">
                <img src={image} alt={alt} className="img-fluid" />
            </div>
            <h4 className="font-weight-bold color-1 mb-4 mb-md-3 d-none d-md-block px-3">
                {title}
            </h4>
            <h3 className="font-weight-bold color-1 mb-4 mb-md-3 d-block d-md-none px-3">
                {title}
            </h3>
            <p 
                className="text-muted px-3 mt-1">
                {description}
            </p>
        </div>
    )
}

const Characteristics = ({
    charList
}) => {
    return (
        <>
            {/* Displayed in desk */}
            <section
                className="container pt-md-5 pb-1 pb-md-5 characteristics">
                <div className="row mt-3 pb-0 pb-md-4 no-gutters">
                    {
                        charList.map((item, index) => {
                            return (
                                <div
                                    key={`serv${index}`} 
                                    className={`col-md-4 characteristics__item ${(index+1) === charList.length ? "pb-0" : "pb-4"} pb-md-0`}>
                                    <Item 
                                        image={item.charImage.image}
                                        title={item.name}
                                        description={item.description}
                                        alt={item.charImage.alt} />
                                    {
                                       (index+1) < charList.length && (
                                            <div 
                                                style={{borderBottom: "2px dashed #eeeeee"}}
                                                className="w-75 mx-auto d-block d-md-none" />
                                       ) 
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            {/* Displayed in mobile */}
            {/* <div
                className="container-fluid bg-1 d-block d-md-none px-3 px-sm-5 pt-3 pb-5">
                <div
                    className="container px-sm-5 py-3">
                    <Carousel showStatus={false} showThumbs={false} emulateTouch>
                        {
                            charList.map((item, index) => {
                                return(
                                    <div
                                        key={`serv2${index}`} 
                                        className="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                        <Item 
                                            image={item.charImage.image}
                                            title={item.name}
                                            description={item.description} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
            </div> */}
        </>
    )
}

export default Characteristics;