import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby';
import { Link as LinkScroll } from "react-scroll";

const socialNetworks = {
    instagram: {
        image: "/img/li-instagram-blue.svg",
        alt: "instagram"
    },
    facebook: {
        image: "/img/li-facebook-blue.svg",
        alt: "facebook"
    },
    linkedin: {
        image: "/img/li-linkedin-blue.svg",
        alt: "linkedin"
    },
    twitter: {
        image: "/img/li-twitter-blue.svg",
        alt: "twitter"
    }
};

const SocialsAboutUs = ({
    data: _data
}) => {
    const openSocialClick = url => {
        if(window)
            window.open(url, "_blank");
    }

    const data = _data.markdownRemark.frontmatter.footer.socials;

    const keys = Object.keys(data);
    let socials = []
    keys.map(key => {
        if (data[key]) {
            socials.push({
                ...socialNetworks[key],
                url: data[key]
            })
        }
        return null;
    })

    return (
        <div className="d-flex align-items-center">
            {
                socials.map((social, index) => (
                    <img
                        key={`social-${index}`}
                        src={social.image}
                        alt={social.alt}
                        className="img-fluid c-pointer opacity mr-3 mr-md-5"
                        onClick={() => openSocialClick(social.url)} />
                ))
            }
        </div>
    )
}

export default props => (
    <StaticQuery
        query={graphql`
        query SocialsAboutUs {
            markdownRemark(frontmatter: { templateKey: { eq: "landing" } }) {
                frontmatter {
                    footer {
                        socials {
                            facebook
                            instagram
                            linkedin
                        }
                    }
                }
            }
        }
      `}
        render={(data, count) => <SocialsAboutUs data={data} count={count} {...props} />}
    />
)