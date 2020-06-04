import React, { useEffect, useState } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby';
import { Link as LinkScroll } from "react-scroll";
import showdown from 'showdown';
import ButtomToggleForm from './ButtomToggleForm';
import Localities from './Localities';
const converter = new showdown.Converter()

const navigationMap = [{
    name: "Clientes",
    to: "customers"
}, {
    name: "Empresa",
    to: "/about-us",
    redirect: true
}, {
    name: "Líneas de trabajo",
    to: "/lines-of-work",
    redirect: true
}, {
    name: "Blog",
    to: "/blog-page",
    redirect: true
}];

const localities = [{
    name: "Bogotá",
    address: "Cra. 12a #No. 83 - 75 Oficina 602 - 501",
    phone: "(675)-0224"
}, {
    name: "Medellín",
    address: "Cra. 12a #No. 83 - 75 Oficina 602 - 501",
    phone: "(675)-0224"
}];

const socialNetworks = {
    instagram: {
        image: "/img/li-instagram.svg",
        alt: "instagram"
    },
    facebook: {
        image: "/img/li-facebook.svg",
        alt: "facebook"
    },
    linkedin: {
        image: "/img/li-linkedin.svg",
        alt: "linkedin"
    }
};

const Footer2 = ({
    data,
    location
}) => {
    const [styles, setStyles] = useState({});

    // const { phones, email } = data.markdownRemark.frontmatter.contacts;
    useEffect(() => {
        const { pathname } = location;
        let _styles = {};
        switch (pathname) {
            case "/lines-of-work":
            case "/about-us":
                _styles = {
                    top: "-8rem"
                }
                setStyles({ ..._styles });
                break;
            default:
                break;
        }
    }, []);

    const { pathname } = location;
    const {
        section3,
        section6
    } = data.markdownRemark.frontmatter;
    const {
        copyright,
        socials
    } = data.markdownRemark.frontmatter.footer;
    const { lines } = section3;

    const openSocialClick = key => {
        if (window)
            window.open(data.markdownRemark.frontmatter.footer.socials[key], "_blank");
    }

    return (
        <footer
            style={styles}
            className="position-relative">
            <div className="container-fluid bg-1 py-5">
                <div className="container container-max d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between">
                    <h3
                        className="text-white font-weight-bold mb-0 mr-md-3">{section6.title}</h3>
                    <ButtomToggleForm
                        btnTitle={section6.btnTitle}
                        buttomType={2} />
                </div>
            </div>
            <div className="container-fluid bg-2-light py-5">
                <div className="container container-max px-xl-0">
                    <div className="row no-gutters">
                        <div className="col-md-3 mb-5 mb-md-0 d-flex align-items-center">
                            <img
                                className="img-fluid mx-auto mx-md-0"
                                src="/img/li-logo-white.svg"
                                alt="placeholder image"
                            />
                        </div>
                        <div className="col-8 col-md-2 text-white">
                            <h5 className="font-weight-bold mb-3">Servicios</h5>
                            {
                                lines.map((line, index) => (
                                    <div
                                        key={`line-foo-${index}`}
                                        className="mb-2">{line.name}</div>
                                ))
                            }
                        </div>
                        <div className="col-4 col-md-2 text-white">
                            <h5 className="font-weight-bold mb-3">Empresa</h5>
                            {
                                navigationMap.map((item, index) => (
                                    <div
                                        key={`nav-map-${index}`}
                                        className="d-flex align-items-center mb-2">
                                        {
                                            item.redirect ? (
                                                <Link
                                                    className="text-white unlink pointer"
                                                    to={item.to}>
                                                    {item.name}
                                                </Link>
                                            ) : (
                                                    <>
                                                        {
                                                            location.pathname === "/" ? (
                                                                <LinkScroll
                                                                    className="c-pointer pointer"
                                                                    smooth={true}
                                                                    duration={500}
                                                                    to={item.to}>
                                                                    {item.name}
                                                                </LinkScroll>
                                                            ) : (
                                                                    <Link
                                                                        className="text-white unlink pointer"
                                                                        to={`/#${item.to}`}>
                                                                        {item.name}
                                                                    </Link>
                                                                )
                                                        }
                                                    </>
                                                )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-5 mt-3 mt-md-0 text-white">
                            <h5
                                className="font-weight-bold mb-3">Contáctanos</h5>
                            <Localities />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-2 py-4">
                <div className="container container-max">
                    <div className="text-white d-flex align-items-center justify-content-between">
                        <div
                            className="html"
                            dangerouslySetInnerHTML={{ __html: converter.makeHtml(copyright) }} />
                        <div className="d-flex align-items-center">
                            {
                                Object.keys(socials).map((key, index) => (
                                    <img
                                        key={`social-${index}`}
                                        className="img-fluid ml-4 c-pointer opacity"
                                        src={socialNetworks[key].image}
                                        alt={socialNetworks[key].alt}
                                        onClick={() => openSocialClick(key)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default props => (
    <StaticQuery
        query={graphql`
        query Footer2 {
            markdownRemark(frontmatter: { templateKey: { eq: "landing" } }) {
                frontmatter {
                    header {
                        title
                        subtitle
                        desc
                    }
                    section3 {
                        lines {
                          name
                        }
                    }
                    footer {
                        copyright
                        socials {
                            facebook
                            instagram
                            linkedin
                        }
                    }
                    section6 {
                        title
                        btnTitle
                    }
                }
            }
        }
      `}
        render={(data, count) => <Footer2 data={data} count={count} {...props} />}
    />
)