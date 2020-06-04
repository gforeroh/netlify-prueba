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
import { Line } from '../components/LinesOfWork';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const converter = new showdown.Converter();

const ITEMS_PER_SLIDE = 3;
const ITEMS_PER_SLIDE_MOBILE = 1;

const Item = ({
    image,
    name,
    social,
    desc,
    width = "100px",
    height = "100px",
}) => {
    const goTo = url => {
        if (window)
            window.open(url, "_blank");
    }

    return (
        <div className="p-3 bg-light">
            <div className="d-flex align-items-center mb-3">
                <img
                    style={{ width, height }}
                    src={image.image}
                    alt={image.alt}
                    className="mr-4 bg-2 rounded-circle" />
                <div className="d-flex flex-column align-items-start">
                    <div className="mb-2">
                        <span className="font-weight-bold mr-1">Por:</span>
                        <span>{name}</span>
                    </div>
                    <div>
                        <small
                            onClick={() => goTo(social.url)}
                            className="c-pointer opacity">
                            {social.name}
                        </small>
                    </div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc) }} />
        </div>
    )
}

const CarouselTests = ({
    testimonials
}) => {
    const [slides, setSlides] = useState([]);
    const [slidesMobile, setSlidesMobile] = useState([]);

    useEffect(() => {
        let _slides = [];
        let _slidesMobile = [];
        for (let index = 0; index < testimonials.length; index = index + ITEMS_PER_SLIDE) {
            _slides.push(testimonials.slice(index, index + ITEMS_PER_SLIDE))
        }
        for (let index = 0; index < testimonials.length; index = index + ITEMS_PER_SLIDE_MOBILE) {
            _slidesMobile.push(testimonials.slice(index, index + ITEMS_PER_SLIDE_MOBILE))
        }
        setSlides(_slides);
        setSlidesMobile(_slidesMobile);
    }, []);

    return (
        <>
            {/* DESKTOP */}
            <div
                className="d-none d-md-block">
                <Carousel showStatus={false} showThumbs={false} emulateTouch>
                    {
                        slides.map((slide, index) => (
                            <div
                                key={`slide${index}`}
                                className="pt-3 pb-5">
                                <div className="row d-flex justify-content-center">
                                    {
                                        slide.map((item, index2) => {
                                            return (
                                                <div
                                                    key={`slide-item${index}${index2}`}
                                                    className="col-6 col-lg-4 mb-4 mb-lg-0">
                                                    <Item
                                                        image={item.image}
                                                        name={item.name}
                                                        social={item.social}
                                                        desc={item.desc}
                                                    />
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
            <div className="d-block d-md-none">
                <Carousel showStatus={false} showThumbs={false} emulateTouch>
                    {
                        slidesMobile.map((slide, index) => (
                            <div
                                key={`slide-mo${index}`}
                                className="pb-5 py-md-3">
                                <div className="d-flex justify-content-center">
                                    {
                                        slide.map((item, index2) => {
                                            return (
                                                <div
                                                    key={`slide-mob-item${index}${index2}`}>
                                                    <Item
                                                        image={item.image}
                                                        name={item.name}
                                                        social={item.social}
                                                        desc={item.desc}
                                                    />
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
        </>
    )
}

export const LinesOfWorkTemplate = ({
    title,
    lines,
    section2,
    testimonials
}) => {
    return (
        <div className="lines">
            <div
                className="lines__list my-md-5">
                <div
                    className="container">
                    <h1 className="font-weight-bold mb-5">{title}</h1>
                    <div className="row no-gutters">
                        {
                            lines.map((line, index) => (
                                <div className="col-sm-6 col-md-4 mb-4">
                                    <Line
                                        line={line} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div
                id="testimonials"
                className="lines__section2 container my-md-5">
                <div className="mt-5">
                    <div className="d-flex flex-column align-items-center">
                        <h3 className="font-weight-bold">{section2.title}</h3>
                        <div
                            className="my-4"
                            dangerouslySetInnerHTML={{ __html: converter.makeHtml(section2.desc) }} />
                    </div>
                    <CarouselTests testimonials={testimonials} />
                </div>
            </div>
        </div>
    )
}

const LinesOfWork = ({
    location,
    data
}) => {
    const {
        title,
        lines: _lines,
        section2,
        testimonials: _testimonials
    } = data.markdownRemark.frontmatter;

    const lines = _lines.map(line => ({
        ...line,
        image: {
            ...line.image,
            image: getImage(line.image, "imagePage")
        }
    }));

    const testimonials = _testimonials.map(test => ({
        ...test,
        image: {
            ...test.image,
            image: getImage(test.image)
        }
    }));

    return (
        <TemplateWrapper2
            location={location}>
            <LinesOfWorkTemplate
                title={title}
                lines={lines}
                section2={section2}
                testimonials={testimonials} />
        </TemplateWrapper2>
    )
}

export default LinesOfWork;

export const pageQuery = graphql`
  query LinesOfWork {
    markdownRemark(frontmatter: { templateKey: { eq: "lines-of-work" } }) {
        frontmatter {
          title
          subtitle
          desc
          lines {
            name
            image {
                imagePage {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                    publicURL
                }
                alt
            }
            desc
            descLarge 
          }
          section2 {
              title
              desc
          }
          testimonials {
            image {
                image {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                    publicURL
                }
                alt
            }
            name
            social {
                name
                url
            }
            desc
          }
        }
    }
  }
`