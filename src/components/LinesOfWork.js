import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import showdown from 'showdown';
import { StaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import Feature2 from './Feature2';
import { getImage } from '../utils';

const converter = new showdown.Converter();

export const Line = ({
    line,
    width = "60px",
    height = "60px"
}) => {
    return (
        <>
            <img
                src={line.image.image}
                alt={line.image.alt}
                className="mb-3 to-scale-with-animation"
                width={width}
                height={height} />
            <div className="font-weight-bold">{line.name}</div>
            <small
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(line.desc) }} />
        </>
    )
}

const LinesOfWork = ({
    data
}) => {
    const {
        title,
        lines: _lines
    } = data.markdownRemark.frontmatter;

    const lines = _lines.map(line => ({
        ...line,
        image: {
            ...line.image,
            image: getImage(line.image)
        }
    }))

    return (
        <section className="container-fluid px-0 py-3 bg-light">
            <div className="container container-max">
                <div className="d-flex justify-content-center mb-3">
                    <Feature2
                        title={title} />
                </div>
                {/* DESKTOP */}
                <div className="d-none d-md-block">
                    <div className="row no-gutters">
                        {
                            lines.map((line, index) => (
                                <div className="col-sm-6 col-md-4 px-3 mb-4">
                                    <Line
                                        line={line} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="d-block d-md-none">
                    <Carousel showStatus={false} showThumbs={false} emulateTouch>
                        {
                            lines.map((line, index) => (
                                <div className="px-3 pb-3">
                                    <Line
                                        key={`slidemo${index}`}
                                        line={line} />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </section>
    )
}

export default props => (
    <StaticQuery
        query={graphql`
        query LinesOfWorkPreview {
            markdownRemark(frontmatter: { templateKey: { eq: "lines-of-work" } }) {
                frontmatter {
                title
                  lines {
                    name
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
                    desc
                  }
                }
            }
        }
      `}
        render={(data, count) => <LinesOfWork data={data} count={count} {...props} />}
    />
)