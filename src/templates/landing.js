import React from 'react'
import { graphql, navigate } from 'gatsby'
import TemplateWrapper2 from '../components/Layout2'
import Characteristics from '../components/Characteristics'
import Feature from '../components/Feature'
import CarouselLogos from '../components/Carousel'
import { getImage } from '../utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Customers from '../components/Customers'
import Feature2 from '../components/Feature2';
import LinesOfWork from '../components/LinesOfWork';
import showdown from 'showdown';
import Partners from '../components/Partners'
import BlogSection from "../pages/blog";
import ButtomToggleForm from '../components/ButtomToggleForm'
const converter = new showdown.Converter()

export const LandingTemplate = ({
  isPreview = false,
  header,
  section1,
  section2,
  section4,
  section5
}) => {
  const goTo = pathname =>
    navigate(pathname)

  return (
    <>
      <section
        id="jumbo"
        style={{ zIndex: "1", top: "-1px" }}
        className="container-fluid cover jumbotron jumbotron-fluid p-0 m-0 position-relative bg-1"
      >
        <div className="container container-max">
          <div className="row no-gutters">
            {/* BOX */}
            <div
              className="col-md-5 d-flex align-items-center cover__box px-3 pr-lg-5">
              <div>
                <h3
                  className="font-weight-bold text-white mt-5 mb-4 mt-md-0 mb-lg-5"
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(header.title) }} />
                <h5
                  style={{ marginBottom: "-.5rem" }}
                  className="font-weight-bold text-white font-italic"
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(header.subtitle) }} />
                <p
                  className="text-white mt-4 mt-md-0"
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(header.desc) }} />
                <ButtomToggleForm
                  btnTitle={header.btnTitle} />
              </div>

            </div>
            <div
              style={{ zIndex: "-5" }}
              className="col-md-7 mt-4 mt-md-0 d-flex flex-column justify-content-center position-relative">
              {/* BANNER DESKTOP */}
              <img
                style={{ zIndex: "1" }}
                className="w-100 ml-md-auto"
                src={header.image.image}
                alt="cover"
                loading="lazy" />
              <div
                style={{
                  width: "300px",
                  height: "50%",
                  bottom: "-2rem",
                  right: "0",
                  zIndex: "-1"
                }}
                className="d-none d-md-flex bg-white position-absolute pb-3" />
            </div>
          </div>
        </div>
      </section>

      {/* digital transformation */}
      <section className="container-fluid pt-5 pt-md-0 px-0">
        <div className="container container-max">
          <div className="row no-gutters">
            <div className="col-md-7 d-flex align-items-center">
              <img
                src={section1.image.image}
                alt={section1.image.alt}
                className="img-fluid w-100 d-none d-md-block to-scale-with-animation" />
              <img
                src={section1.image.imageSm}
                alt={section1.image.alt}
                className="img-fluid w-100 d-block d-md-none to-scale-with-animation" />
            </div>
            <div className="col-md-5 mt-5 mt-md-0 px-3 d-flex align-items-center">
              <div className="pl-md-3 pl-md-5">
                <h4 className="font-weight-bold mb-4">{section1.title}</h4>
                <div
                  className="text-muted"
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(section1.desc) }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* customers */}
      <section
        id="customers"
        className="container container-max py-5">
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div className="px-3">
              <h4 className="font-weight-bold mb-4">{section2.title}</h4>
              <div
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(section2.desc) }} />
            </div>
          </div>
          <div className="col-md-8">
            <Customers logos={section2.customers} />
          </div>
        </div>
      </section>

      {/* lines */}
      {
        !isPreview && (
          <LinesOfWork />
        )
      }

      {/* testimonials */}
      <section className="testimonials container-fluid py-5 py-lg-0 px-0">
        <div className="container container-max">
          <div className="row no-gutters">
            <div className="col-md-5 px-md-3 d-flex align-items-center">
              <div className="d-md-flex">
                <div>
                  <div className="px-3 px-md-0">
                    <h5 className="font-weight-bold mb-4">{section4.title}</h5>
                    <div
                      onClick={() => goTo("/lines-of-work/#testimonials")}
                      style={{ fontSize: ".8rem" }}
                      className="font-weight-bold color-3 w-100 mb-4 d-block d-md-none c-pointer opacity">
                      Ver todos
                    </div>
                    <div className="font-weight-bold mb-4">{section4.subtitle}</div>
                    <div
                      className="text-muted"
                      dangerouslySetInnerHTML={{ __html: converter.makeHtml(section4.desc1) }} />
                  </div>
                  <img
                    src={section4.image.imageSm}
                    alt={section4.image.alt}
                    className="img-fluid w-100 d-block d-md-none to-scale-with-animation" />
                  <div className="px-3 px-md-0 mt-4 mt-md-0">
                    <div
                      style={{ borderRadius: "1rem", backgroundColor: "#f2f2f2" }}
                      className="p-3">
                      <div
                        className="border-bottom testimonials__description"
                        dangerouslySetInnerHTML={{ __html: converter.makeHtml(section4.desc2) }} />
                      <div className="color-3">
                        <div className="font-weight-bold">{section4.author.name}</div>
                        <div>{section4.author.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => goTo("/lines-of-work/#testimonials")}
                  style={{ fontSize: ".8rem" }}
                  className="font-weight-bold color-3 w-100 text-right d-none d-md-block c-pointer opacity">Ver todos</div>
              </div>
            </div>
            <div className="col-md-7 d-flex align-items-center">
              <img
                src={section4.image.image}
                alt={section4.image.alt}
                className="img-fluid w-100 d-none d-md-block to-scale-with-animation" />
            </div>
          </div>
        </div>

      </section>

      {/* partners */}
      <Partners
        image={section5.image}
        title={section5.title}
        desc={section5.desc}
        partners={section5.partners}
      />
      {
        !isPreview && (
          <BlogSection />
        )
      }
    </>
  )
};

const Landing = ({
  location,
  data
}) => {
  const {
    header: _header,
    section1: _section1,
    section2: _section2,
    section4: _section4,
    section5: _section5,
  } = data.markdownRemark.frontmatter;

  const header = {
    ..._header,
    image: {
      ..._header.image,
      image: getImage(_header.image)
    }
  }

  const section1 = {
    ..._section1,
    image: {
      ..._section1.image,
      image: getImage(_section1.image),
      imageSm: getImage(_section1.image, "imageSm")
    }
  }

  const section2 = {
    ..._section2,
    customers: _section2.customers.map(customer => ({
      ...customer,
      image: {
        ...customer.image,
        image: getImage(customer.image)
      }
    }))
  }

  const section4 = {
    ..._section4,
    image: {
      ..._section4.image,
      image: getImage(_section4.image),
      imageSm: getImage(_section4.image, "imageSm")
    }
  }

  const section5 = {
    ..._section5,
    image: {
      ..._section5.image,
      image: getImage(_section5.image),
      imageSm: getImage(_section5.image, "imageSm")
    },
    partners: _section5.partners.map(partner => ({
      ...partner,
      image: {
        ...partner.image,
        image: getImage(partner.image)
      }
    }))
  }

  return (
    <TemplateWrapper2
      location={location}>
      <LandingTemplate
        header={header}
        section1={section1}
        section2={section2}
        section4={section4}
        section5={section5}
      />
    </TemplateWrapper2>
  )
}

export default Landing

export const pageQuery = graphql`
  query Landing {
    markdownRemark(frontmatter: { templateKey: { eq: "landing" } }) {
      frontmatter {
        header {
          title
          subtitle
          desc
          btnTitle  
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
        }
        section1 {
          image {
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
          title
          desc
        }
        section2 {
          title
          desc
          customers {
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
          }
        }
        section4 {
          title
          subtitle
          desc1
          desc2
          author {
            name
            position
          }
          image {
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
        }
        section5 {
          image {
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
          title
          desc
          partners {
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
          }
        }
      }
    }
  }
`