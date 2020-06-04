import React from 'react'
import withContactForm from './withContactForm'

const ButtomToggleForm = ({
    btnTitle,
    buttomType = 1,
    toggleOpen
}) => {

    return (
        <>
            {
                buttomType === 1 ? (
                    <button
                        onClick={toggleOpen}
                        className="btn btn-outline-primary"
                    >
                        {btnTitle}
                    </button>
                ) : (
                        <button
                            onClick={toggleOpen}
                            style={{ padding: ".8rem 3rem" }}
                            className="btn btn-outline-primary mt-3 mt-md- font-weight-bold"
                        >
                            {btnTitle}
                        </button>
                    )
            }
        </>
    )
}

export default withContactForm(ButtomToggleForm);