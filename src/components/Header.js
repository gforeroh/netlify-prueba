import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Link as LinkScroll } from "react-scroll";

export const HICOME_URL = "https://app.hicome.co/login";
const links = [{
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

const Header = ({
    location
}) => {
    const [open, setOpen] = useState(null);

    const toggleOpen = () =>
        setOpen(open === null || !open ? true : false)

    const {
        pathname
    } = location;
    const logo = pathname === "/" ? "/img/li-logo-white.svg" : "/img/li-logo.svg";
    const navBg = pathname === "/" ? "#45a4fd" : "#ffffff";

    let menuClassname = "";
    if (open)
        menuClassname = "menu-overlay--open";
    else if (open === false)
        menuClassname = "menu-overlay--close";
    return (
        <div
            style={{ backgroundColor: navBg }}
            id="header"
            className="container-fluid px-0">
            <div
                className={`menu-overlay ${menuClassname}`}>
                <div className="h-100">
                    <div
                        className="d-flex align-items-center justify-content-between position-abolute p-3 px-md-5 py-md-4">
                        <Link
                            style={{
                                zIndex: "10000000"
                            }}
                            className="" to="/">
                            <img
                                className="header__logo img-fluid"
                                src="/img/li-logo-white.svg"
                                alt="placeholder image"
                            />
                        </Link>
                        <div
                            style={{
                                fontSize: "2rem",
                                zIndex: "10000000"
                            }}
                            className="font-weight-bold text-white c-pointer opacity"
                            onClick={toggleOpen}>
                            x
                        </div>
                    </div>
                    <div
                        className="list-items-link d-flex flex-column align-items-center justify-content-center h-100">
                        {
                            links.map((item, index) => (
                                <div
                                    key={`link${index}`}
                                    className="font-weight-bold">
                                    {
                                        item.redirect ? (
                                            <Link
                                                onClick={toggleOpen}
                                                to={item.to}
                                                className={`${location && location.pathname === item.to ? "active" : ""} item-link`}>
                                                {/* <span className="d-inline-block d-lg-none mr-3">+</span> */}
                                                {item.name}
                                            </Link>
                                        ) : (
                                                <>
                                                    {
                                                        location.pathname === "/" ? (
                                                            <LinkScroll
                                                                smooth={true}
                                                                duration={500}
                                                                to={item.to}
                                                                onClick={toggleOpen}
                                                                className={`c-pointer item-link ${location && location.pathname.includes(item.to.replace("#", "/")) ? "active" : ""}`}>
                                                                {/* <span className="d-inline-block d-lg-none mr-3">+</span> */}
                                                                {item.name}
                                                            </LinkScroll>
                                                        ) : (
                                                                <Link
                                                                    to={`/#${item.to}`}
                                                                    onClick={toggleOpen}
                                                                    className={`item-link ${location && location.pathname === item.to ? "active" : ""}`}>
                                                                    {/* <span className="d-inline-block d-lg-none mr-3">+</span> */}
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
                </div>
            </div>
            <div className="container container-max">
                <nav
                    className="navbar navbar-light px-0 py-4 h-100">
                    <Link className="navbar-brand" to="/">
                        <img
                            className="header__logo img-fluid ml-3"
                            src={logo}
                            alt="placeholder image"
                        />
                    </Link>
                    <div
                        style={{ height: "100%", top: "0", right: "0", backgroundColor: pathname === "/" ? "#ffffff" : "" }}
                        className="header__menu d-flex align-items-center justify-content-center position-absolute">
                        <img
                            src="/img/menu.svg"
                            alt="menu"
                            className="menu-burguer-icon img-fluid c-pointer opacity"
                            onClick={toggleOpen}
                        />
                        {/* <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button> */}
                    </div>

                    {/* <div 
                    className="collapse navbar-collapse bg-white py-md-3" 
                    id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto align-items-center px-3 mr-md-5">
                        {
                            links.map((item, index) => (
                                <li 
                                    key={`link${index}`} 
                                    className="nav-item nav-item-menu mb-md-3 ml-lg-5 nav-li font-weight-bold">
                                    {
                                        item.redirect ? (
                                            <Link 
                                                to={item.to}
                                                className={`nav-link ${location && location.pathname === item.to ? "active" : ""} text-muted pb-0 color-1`}>
                                                <span className="d-inline-block d-lg-none mr-3">+</span>
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <>
                                                {
                                                    location.pathname === "/" ? (
                                                        <LinkScroll
                                                            smooth={true}
                                                            duration={500}
                                                            to={item.to}
                                                            className={`c-pointer nav-link ${location && location.pathname.includes(item.to.replace("#", "/")) ? "active" : ""} text-muted pb-0 color-1`}>
                                                            <span className="d-inline-block d-lg-none mr-3">+</span>
                                                            {item.name}
                                                        </LinkScroll>
                                                    ) : (
                                                        <Link 
                                                            to={`/#${item.to}`}
                                                            className={`nav-link ${location && location.pathname === item.to ? "active" : ""} text-muted pb-0 color-1`}>
                                                            <span className="d-inline-block d-lg-none mr-3">+</span>
                                                            {item.name}
                                                        </Link>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div> */}
                </nav>
            </div>
        </div>
    )
}

export default Header;