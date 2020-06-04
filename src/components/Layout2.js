import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import Header from './Header'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './all.sass'
import './css/general.css';
import './css/utilities.css';
import './css/components.css';
import './css/object.css';
import './css/elements.css';
import Footer2 from './Footer2'

const TemplateWrapper2 = ({ children, location }) => {
  const { title, description } = useSiteMetadata()

  useEffect(() => {
    const popper = typeof window !== `undefined` ? require("../../node_modules/popper.js/dist/popper.min.js") : null
    const bootstrap = typeof window !== `undefined` ? require("../../node_modules/bootstrap/dist/js/bootstrap.min.js") : null
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/hicome-meta.png`}
        />
      </Helmet>
      <Header location={location} />
      {children}
      <Footer2 location={location} />
    </>
  )
}

export default TemplateWrapper2
