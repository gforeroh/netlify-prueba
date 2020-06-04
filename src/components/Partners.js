import React from 'react'
import showdown from 'showdown';
const converter = new showdown.Converter()

const PartnerItem = ({
    partner
}) => {
    const {
        image
    } = partner;

    return (
        <div
            style={{ borderRadius: "1.5rem" }}>
            <img
                src={image.image}
                alt={image.alt}
                className="img-fluid d-flex mx-auto mx-md-0 to-scale-with-animation" />
        </div>
    )
}

const Partners = ({
    image,
    title,
    desc,
    partners
}) => {
    return (
        <section className="container-fluid pb-4 pt-md-4 pt-lg-0 pb-md-0 px-3 px-md-0 bg-2">
            <div className="container container-max">
                <div className="row no-gutters">
                    <div className="col-md-7 d-flex align-items-center px-0">
                        <img
                            src={image.image}
                            alt={image.alt}
                            className="img-fluid w-100 d-none d-md-block to-scale-with-animation" />
                        <img
                            src={image.imageSm}
                            alt={image.alt}
                            className="img-fluid w-100 d-block d-md-none to-scale-with-animation" />
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                        <div className="pl-md-3 pl-lg-5 pr-md-3">
                            <h4 className="font-weight-bold text-white mt-5 mt-md-0 mb-4">{title}</h4>
                            <div
                                className="text-white mb-4"
                                dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc) }} />
                            <div className="row">
                                {
                                    partners.map((partner, index) => (
                                        <div
                                            key={`partner-${index}`}
                                            className="col-6 col-lg-4 mb-4">
                                            <PartnerItem
                                                partner={partner} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Partners;