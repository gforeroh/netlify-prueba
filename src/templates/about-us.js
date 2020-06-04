import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import TemplateWrapper2 from '../components/Layout2'
import Feature2 from '../components/Feature2'
import SocialNetworks from '../components/SocialNetworks'
import { graphql, navigate } from 'gatsby';
import { getImage } from '../utils';
import { Helmet } from 'react-helmet';
import Truncate from 'react-truncate';
import showdown from 'showdown';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import SocialsAboutUs from '../components/SocialsAboutUs'

const converter = new showdown.Converter();

const socialNetworks = {
    instagram: {
        image: "/img/li-instagram-profile.svg",
        alt: "instagram"
    },
    facebook: {
        image: "/img/li-facebook-profile.svg",
        alt: "facebook"
    },
    twitter: {
        image: "/img/li-twitter-profile.svg",
        alt: "twitter"
    },
    linkedin: {
        image: "/img/li-linkedin-profile.svg",
        alt: "linkedin"
    }
};

const CardProfile = ({
    data
}) => {
    const goTo = url => {
        if (window)
            window.open(url, "_blank")
    }

    let socials = [];
    Object.keys(data.socials).map(key => {
        if (data.socials[key]) {
            socials.push({
                ...socialNetworks[key],
                url: data.socials[key]
            });
        }
    });

    return (
        <div className="d-flex position-relative bg-2">
            <img
                style={{ zIndex: "1", objectFit: "cover" }}
                src={data.image}
                alt={data.alt}
                className="img-fluid w-100 d-none d-md-block to-scale-with-animation" />
            <img
                style={{ zIndex: "1", objectFit: "cover", height: "fit-content" }}
                src={data.imageSm}
                alt={data.alt}
                className="img-fluid w-100 d-block d-md-none to-scale-with-animation" />
            <div
                style={{
                    zIndex: "2"
                }}
                className="d-flex text-white position-absolute h-100 w-100">
                <div className="d-flex align-items-end w-100">
                    <div className="d-flex flex-column justify-content-center w-100 py-3 px-4">
                        <span className="mx-auto font-weight-bold">{data.name}</span>
                        <span className="mx-auto">{data.position}</span>
                        <div
                            style={{ border: ".5px solid white" }}
                            className="my-3" />
                        <div className="d-flex align-items-center justify-content-between">
                            {
                                socials.map((social, index) => (
                                    <div
                                        key={`social${social.url}${index}`}
                                        className="c-pointer opacity social-effect rounded-circle px-1 d-flex align-items-center justify-content-center"
                                        style={{ border: "1px solid white", width: "35px", height: "35px" }}
                                        onClick={() => goTo(social.url)}>
                                        <img
                                            src={social.image}
                                            alt={social.alt}
                                            className="img-fluid"
                                            style={{ width: "17px", height: "17px" }} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const AboutUsSection1 = ({
    data,
    isPreview = false
}) => {
    const {
        title,
        desc,
        columns
    } = data;

    return (
        <div
            className="about-us__resume my-md-5 px-3 px-md-5">
            <div
                className="px-md-5">
                <h1 className="font-weight-bold">{title}</h1>
                <div
                    className="about-us__resume__desc  my-5"
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc) }} />
                <div className="row mb-5">
                    <div className="col-md-6">
                        <div
                            dangerouslySetInnerHTML={{ __html: converter.makeHtml(columns.column1) }} />
                    </div>
                    <div className="col-md-6">
                        <div
                            dangerouslySetInnerHTML={{ __html: converter.makeHtml(columns.column2) }} />
                    </div>
                </div>
                {
                    !isPreview && (
                        <SocialsAboutUs />
                    )
                }
            </div>
        </div>
    )
}

const AboutUsSection2 = ({
    data
}) => {
    const {
        title1,
        title2,
        desc2,
        gallery
    } = data

    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="px-3 px-md-5">
                <div className="px-md-5 d-none d-md-flex flex-md-column align-items-center">
                    <h2 className="font-weight-bold">{title1}</h2>
                    <div
                        className="my-4"
                        dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc2) }} />
                </div>
            </div>
            <div className="py-md-4">
                <div className="d-none d-md-block">
                    <div className="row no-gutters">
                        {
                            gallery.map((gall, index) => (
                                <div
                                    key={`index-gall${index}`}
                                    className="col-md-6 col-lg-3 bg-2">
                                    <img
                                        src={gall.image}
                                        alt={gall.alt}
                                        className="img-fluid w-100"
                                        style={{objectFit: "cover", height: "fit-content"}} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="d-block d-md-none">
                    <Carousel showStatus={false} showThumbs={false} emulateTouch>
                        {
                            gallery.map((gall, index) => (
                                <div
                                    key={`index-gall-mobile${index}`}
                                    className="pb-5 bg-2 h-75">
                                    <img
                                        src={gall.image}
                                        alt={gall.alt}
                                        className="img-fluid w-100"
                                        style={{objectFit: "cover", height: "fit-content"}} />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
            <div className="px-3 px-md-5 mt-4">
                <div className="px-md-5 flex-md-column align-items-center">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <div
                                dangerouslySetInnerHTML={{ __html: converter.makeHtml(title2) }} />
                        </div>
                        <div className="col-md-6">
                            <div
                                dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc2) }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const AboutUsSection3 = ({
    data
}) => {
    const {
        title,
        gallery
    } = data

    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="px-3 px-md-5">
                <div className="px-md-5 d-none d-md-flex flex-md-column align-items-center">
                    <h2 className="font-weight-bold">{title}</h2>
                </div>
            </div>
            <div className="py-md-4">
                <div className="d-none d-md-block">
                    <div className="row">
                        {
                            gallery.map((gall, index) => (
                                <div
                                    key={`index-gall-personajes${index}`}
                                    className="col-md-6 col-lg-3 mb-md-4 mb-lg-0">
                                    <CardProfile data={gall} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="d-block d-md-none">
                    <Carousel showStatus={false} showThumbs={false} emulateTouch>
                        {
                            gallery.map((gall, index) => (
                                <div
                                    key={`index-gall-mobile-personajes${index}`}
                                    className="mb-5">
                                    <CardProfile data={gall} />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </div>

    )
}

const AboutUsSection4 = ({
    data
}) => {
    const {
        desc1,
        title,
        desc2,
        offices
    } = data;

    return (
        <div
            style={{ color: "#b0b2b4" }}
            className="container d-flex flex-column justify-content-center">
            <div className="d-flex flex-column align-items-center">
                <div
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc1) }} />
                <h4 className="font-weight-bold text-white">{title}</h4>
                <div
                    className="my-4"
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc2) }} />
            </div>
            <div className="d-none d-md-block">
                <div className="row">
                    {
                        offices.map((office, index) => (
                            <div
                                key={`index-office${index}`}
                                className="col-md-6 col-lg-4 mb-md-4 mb-lg-0">
                                <div
                                    style={{ border: "2px solid white" }}
                                    className="d-flex flex-column justify-content-center p-3">
                                    <h6 className="font-weight-bold text-white">{office.name}</h6>
                                    <div>
                                        Phone: <span>{office.phone}</span>
                                    </div>
                                    <div>
                                        E-mail: <span>{office.email}</span>
                                    </div>
                                    <div
                                        style={{
                                            border: "1px solid white"
                                        }}
                                        className="w-100 my-3" />
                                    <span>{office.address}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="d-block d-md-none">
                <Carousel showStatus={false} showThumbs={false} emulateTouch>
                    {
                        offices.map((office, index) => (
                            <div
                                key={`index-office-mobile${index}`}
                                className="pb-5">
                                <div
                                    style={{ border: "2px solid white" }}
                                    className="d-flex flex-column justify-content-center p-3">
                                    <h6 className="font-weight-bold text-white">{office.name}</h6>
                                    <div>
                                        Phone: <span>{office.phone}</span>
                                    </div>
                                    <div>
                                        E-mail: <span>{office.email}</span>
                                    </div>
                                    <div
                                        style={{
                                            border: "1px solid white"
                                        }}
                                        className="w-100 my-3" />
                                    <span>{office.address}</span>
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    )
}

export const AboutUsTemplate = ({
    section1,
    section2,
    section3,
    section4,
    isPreview = false
}) => {
    return (
        <>
            <div className="about-us">
                <AboutUsSection1
                    data={section1}
                    isPreview={isPreview} />
            </div>
            <div style={{
                position: "relative",
                top: "-8rem"
            }}>
                <div className="container-fluid px-0 my-3 my-md-5">
                    <AboutUsSection2 data={section2} />
                </div>
                <div className="container px-0 my-3 my-md-5">
                    <AboutUsSection3 data={section3} />
                </div>
                <div
                    style={{ backgroundColor: "#00080f" }}
                    className="container-fluid py-5">
                    <AboutUsSection4 data={section4} />
                </div>
            </div>
        </>
    )
}

const AboutUs = ({
    location,
    data
}) => {

    const {
        section1,
        section2: _section2,
        section3: _section3,
        section4
    } = data.markdownRemark.frontmatter;

    const section2 = {
        ..._section2,
        gallery: _section2.gallery.map(gall => ({
            ...gall,
            image: getImage(gall),
            imageSm: getImage(gall, "imageSm")
        }))
    }

    const section3 = {
        ..._section3,
        gallery: _section3.gallery.map(gall => ({
            ...gall,
            image: getImage(gall),
            imageSm: getImage(gall, "imageSm")
        }))
    }

    return (
        <TemplateWrapper2
            location={location}>
            <AboutUsTemplate 
                section1={section1}
                section2={section2}
                section3={section3}
                section4={section4} 
                />
        </TemplateWrapper2>
    )
}

export default AboutUs;

export const pageQuery = graphql`
  query AboutUs {
    markdownRemark(frontmatter: { templateKey: { eq: "about-us" } }) {
        frontmatter {
            section1 {
              title
              desc  
              columns {
                  column1
                  column2
              }
            }
            section2 {
                title1
                desc1
                gallery {
                    image {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                        publicURL
                    }
                    imageSm {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                        publicURL
                    }
                    alt
                }
                title2
                desc2
            }
            section3 {
                title
                gallery {
                    image {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                        publicURL
                    }
                    imageSm {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                        publicURL
                    }
                    alt
                    name
                    position
                    socials {
                        instagram
                        facebook
                        twitter
                        linkedin
                    }
                }
            }
            section4 {
                desc1
                title
                desc2
                offices {
                    name
                    phone
                    email
                    address
                }
            }

        }
    }
  }
`