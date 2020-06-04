import React from 'react'

const Feature = ({
    icon, 
    alt,
    title,
    color = "color-1",
    bg = "bg-1"
}) => {
    return (
        <>
            <div className="d-flex align-items-center">
                <img 
                    src={icon}
                    alt={alt}
                    className="img-fluid mr-3" />
                <h4 className={`${color} font-weight-bold`}>{title}</h4>
            </div>
            <hr className={`w-100 mt-4 ${bg}`} />
        </>
    )
}

export default Feature;