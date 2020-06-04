import React from 'react'

const Feature2 = ({
    title,
    style,
    className = "text-uppercase",
    primaryColor = "#45a4fd"
}) => {
    return (
        <div
            className={`py-4 d-inline-block feature`}>
            <h3 
                className={`mb-0 text-center font-weight-bold ${className}`}
                style={style}>{title}</h3>
            <div className="feature__line mx-auto">
                <div
                    style={{backgroundColor: primaryColor}} 
                    className="d-inline-block feature__line__primary" />
            </div>
        </div>
    )
}

export default Feature2;