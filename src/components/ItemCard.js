import React from 'react'

const Title = ({
    title
}) => {
    return (
        <div
            className={`p3-4`}>
            <h5 
                className={`mb-0 text-center text-uppercase font-weight-bold text-muted text-center`}>
                {title}
            </h5>
            <div className="w-75 mx-auto">
                <div 
                    style={{backgroundColor: "#17a4d6", height: "4px", width: "40%"}}
                    className="d-inline-block" />
                <div 
                    style={{backgroundColor: "#71ffd2", height: "4px", width: "60%"}}
                    className="d-inline-block" />
            </div>
        </div>
    )
}

const ItemCard = ({
    image,
    alt,
    title,
    resume
}) => {
    return (
        <div 
            style={{borderRadius: "15px"}}
            className="bg-light py-4 px-3 h-100">
            <img 
                src={image}
                alt={alt}
                className="img-fluid w-75 d-flex mx-auto mb-4" />
            <Title 
                title={title} />
            <p 
                style={{fontSize: "14px"}}
                className="text-muted mt-4">
                {resume}
            </p>
        </div>
    )
}

export default ItemCard;