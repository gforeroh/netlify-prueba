import React from 'react'
import Feature2 from '../../components/Feature2';
import { graphql, StaticQuery, Link, navigate } from 'gatsby';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { getImage } from '../../utils';
import { MONTHS } from '../../constants';

const Item = ({
    title,
    image,
    alt,
    author,
    date,
    slug
}) => {
    const goTo = () => 
        navigate(slug)

    const dd = new Date(date).getDate();
    const month = MONTHS[new Date(date).getMonth()];

    return (
        <div
            onClick={goTo} 
            className="c-pointer opacity to-scale-with-animation">
            <div className="position-relative bg-2">
                <img
                    src={image}
                    alt={alt}
                    className="img-fluid w-100" />
                <div
                    style={{top: "2rem", left: "0"}} 
                    className="d-inline-block position-absolute">
                    <div
                        className="bg-1 py-2 px-3 text-white d-flex flex-column align-items-center justify-content-center">
                        <h5 className="font-weight-bold mb-0">{dd}</h5>
                        <h6 className="mb-0">{month}</h6>
                    </div>
                </div>
            </div>
            <div
                style={{ height: "150px" }}
                className="bg-light p-3">
                <div
                    style={{ height: "78px" }}
                    className="py-3 text-ellipsis-sm mb-2 font-weight-bold">
                    {title}
                </div>
                <div className="d-flex align-items-center text-muted">
                    <small className="mr-3 font-weight-bold">Autor</small>
                    <img
                        src={author.photo.image}
                        alt={author.photo.alt}
                        className="mr-3 bg-2 rounded-circle"
                        style={{ width: "30px", height: "30px" }} />
                    <small className="mr-5 font-weight-bold">{author.name}</small>
                    <div className="d-flex">
                        <img
                            src="/img/li-message.png"
                            alt="message"
                            className="mr-1" />
                        <span style={{ opacity: ".7" }}>|</span>
                        <img
                            src="/img/li-share.png"
                            alt="share" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const BlogSection = ({
    title,
    data
}) => {
    const posts = data.allMarkdownRemark.edges;

    return (
        <>
            {/* Displayed in desk */}
            <section
                id="blog"
                className="container-fluid py-3">
                <div className="container container-max">
                    <div className="d-flex justify-content-center font-weight-bold">
                        <Feature2 title="Blog" />
                    </div>
                    <div className="d-none d-md-block">
                        <div className="row mt-5 pb-4">
                            {
                                posts.map((item, index) => {
                                    return (
                                        <div
                                            key={`prop${index}`}
                                            className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                                            <Item
                                                image={getImage(item.node.frontmatter, "featuredimage")}
                                                title={item.node.frontmatter.title}
                                                to={item.node.fields.slug}
                                                author={{
                                                    ...item.node.frontmatter.author,
                                                    photo: {
                                                        ...item.node.frontmatter.author.photo,
                                                        image: getImage(item.node.frontmatter.author, "photo")
                                                    }
                                                }}
                                                date={item.node.frontmatter.date}
                                                slug={item.node.fields.slug} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* Displayed in mobile */}
                    <div className="d-block d-md-none">
                        <Carousel showStatus={false} showThumbs={false} emulateTouch>
                            {
                                posts.map((item, index) => (
                                    <div
                                        style={{ backgroundColor: "transparent" }}
                                        className="row px-md-0 pb-5">
                                        <div
                                            key={`prop${index}`}
                                            className="col-md-4">
                                            <Item
                                                image={getImage(item.node.frontmatter, "featuredimage")}
                                                title={item.node.frontmatter.title}
                                                to={item.node.fields.slug}
                                                author={{
                                                    ...item.node.frontmatter.author,
                                                    photo: {
                                                        ...item.node.frontmatter.author.photo,
                                                        image: getImage(item.node.frontmatter.author, "photo")
                                                    }
                                                }}
                                                date={item.node.frontmatter.date}
                                                slug={item.node.fields.slug} />
                                        </div>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    )
}

export default props => (
    <StaticQuery
        query={graphql`
        query BlogSection {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
                limit: 3
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            featuredimage {
                                childImageSharp {
                                    fluid {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                            description
                            altFeatured
                            date
                            author {
                                name
                                photo {
                                    childImageSharp {
                                        fluid {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                                alt
                            }
                        }
                    }
                }
            }
        }
      `}
        render={(data, count) => <BlogSection data={data} count={count} title="BLOG" {...props} />}
    />
)