import React from 'react'
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

const converter = new showdown.Converter();

const Post = ({
    image,
    alt,
    title,
    author,
    date,
    slug,
    description
}) => {
    const goTo = () =>
        navigate(slug)

    return (
        <div
            onClick={goTo}
            className="post-list c-pointer opacity">
            <div className="position-relative">
                <img
                    src={image}
                    alt={alt}
                    className="post-list__img-cover img-fluid w-100 bg-2" />
                <div
                    className="post-list__overlay d-flex flex-column flex-md-row justify-content-between position-relative">
                    <div className="d-flex flex-column flex-md-row alig-items-start align-items-md-end">
                        <img
                            src={author.image}
                            alt={author.alt}
                            style={{height: "127px", width: "127px"}}
                            className="mx-auto ml-md-0 mr-md-2 bg-2 rounded-circle" />
                        <div>
                            <span className="font-weight-bold mr-1 align-self mb-3">Por:</span>
                            <span className="mr-5 mb-3">{author.name}</span>
                        </div>

                    </div>
                    <div className="d-flex alig-items-start align-items-md-end text-muted mb-3 mb-md-0 mr-3">
                        <span>{date}</span>
                    </div>
                </div>
            </div>
            <div
                style={{ top: "-4rem" }}
                className="position-relative py-3">
                <div
                    style={{ height: "50px" }}
                    className="py-3 text-ellipsis-sm mb-2 font-weight-bold">
                    {title}
                </div>
                <Truncate lines={4} ellipsis={<span>...</span>}>
                    <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }} />
                </Truncate>
            </div>
            <div
                style={{ top: "-4rem" }}
                className="d-flex align-items-center justify-content-between justify-content-md-start position-relative">
                <button
                    className="btn btn-3 btn-outline-primary"
                >
                    Ver mas
                </button>
                <div className="ml-md-5">
                    <img
                        src="/img/li-like.png"
                        alt="like post"
                        className="pr-5 border-right" />
                    <img
                        src="/img/li-comment.png"
                        alt="comment post"
                        className="pl-5" />
                </div>
            </div>

        </div>
    )
}

export const BlogPageTemplate = ({
    title,
    desc,
    posts
}) => {
    return (
        <div className="px-3 px-md-5">
            <div className="px-md-5">
                <h1 className="font-weight-bold mb-4">{title}</h1>
                <div className="row mb-4">
                    <div className="col-lg-6">
                        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc) }} />
                    </div>
                </div>
                {
                    posts && (
                        <div className="row">
                            {
                                posts.map((item, index) => (
                                    <div
                                        key={`post${index}`}
                                        className="position-relative col-md-6">
                                        <Post
                                            image={item.listImage}
                                            alt={item.altList}
                                            title={item.title}
                                            author={item.author}
                                            date={item.date}
                                            slug={item.slug}
                                            description={item.description} />
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const BlogPage = ({
    location,
    data
}) => {
    console.log('data :>> ', data);
    const _posts = data.allMarkdownRemark.edges;

    const {
        title,
        desc
    } = data.markdownRemark.frontmatter;

    const posts = _posts.map(post => ({
        ...post.node.frontmatter,
        slug: post.node.fields.slug,
        listImage: getImage(post.node.frontmatter, "listImage"),
        author: {
            ...post.node.frontmatter.author,
            image: getImage(post.node.frontmatter.author, "photoBig")
        }
    }));

    return (
        <TemplateWrapper2
            location={location}>
            <>
                <Helmet titleTemplate="%s">
                    <title>
                        Información práctica para gestionar hoteles | Blog
                    </title>
                    <meta
                        name="description"
                        content="Conoce la importancia del buen servicio de atención al cliente en los hoteles, las cosas que no deberías hacer si tienes un hospedaje, los beneficios de tener Fan Page de Facebook para tu hotel, y la mejor forma de crear tu página de Facebook empresarial."
                    />
                </Helmet>
                <BlogPageTemplate
                    title={title}
                    desc={desc}
                    posts={posts}
                />
                {/* <div className="px-3 px-md-5">
                    <div className="px-md-5">
                        <h1 className="font-weight-bold mb-4">{title}</h1>
                        <div className="row mb-4">
                            <div className="col-lg-6">
                                <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc) }} />
                            </div>
                        </div>
                        <div className="row">
                            {
                                posts.map((item, index) => (
                                    <div
                                        key={`post${index}`}
                                        className="position-relative col-md-6">
                                        <Post
                                            image={item.node.frontmatter.listImage.childImageSharp.fluid.src}
                                            alt={item.node.frontmatter.altList}
                                            title={item.node.frontmatter.title}
                                            author={{
                                                name: item.node.frontmatter.author.name,
                                                image: getImage(item.node.frontmatter.author, "photoBig"),
                                                alt: item.node.frontmatter.author.alt
                                            }}
                                            date={item.node.frontmatter.date}
                                            slug={item.node.fields.slug}
                                            description={item.node.frontmatter.description} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div> */}
            </>
        </TemplateWrapper2>
    )
}

export default BlogPage;

export const pageQuery = graphql`
  query BlogPage {
    markdownRemark(frontmatter: { templateKey: { eq: "blog-page" } }) {
        frontmatter {
          title
          desc
        }
    }
    allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
        edges {
            node {
                fields {
                    slug
                }
                frontmatter {
                    title
                    description
                    author {
                        name
                        photoBig {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        alt
                    }
                    date(formatString: "DD MMMM YYYY")
                    listImage {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                      }
                      altList
                }
            }
        }
    }
  }
`