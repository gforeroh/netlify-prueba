import React from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'
import TemplateWrapper2 from '../components/Layout2'
import Feature2 from '../components/Feature2'
import showdown from 'showdown';
import { getImage } from '../utils';

const converter = new showdown.Converter()

const Post = ({
    title,
    authorName,
    date,
    slug
}) => {
    const onPostClick = () =>
        navigate(slug)

    return (
        <div
            onClick={onPostClick}
            className="d-flex flex-column justify-content-center p-3 h-100 border c-pointer opacity-sh">
            <small className="mb-3">{date}</small>
            <div className="font-weight-bold">
                <div>{title}</div>
            </div>
            <div className="mt-3">
                <span className="font-weight-bold mr-1">Por:</span>
                <span>{authorName}</span>
            </div>
        </div>
    )
}

const ItemAuthor = ({
    image,
    alt,
    title,
    name,
    date,
    isPreview = false
}) => {
    return (
        <div className="py-3">
            <div className="d-flex flex-column flex-md-row align-items-md-end">
                <div className="mx-auto mx-md-0 mr-md-3">
                    <img
                        style={{ width: "140px", height: "140px" }}
                        className="img-fluid rounded-circle"
                        src={image}
                        alt={alt} />
                </div>
                <div className="mb-2 mb-md-3">
                    <span className="font-weight-bold mr-1">Por:</span>
                    <span>{name}</span>
                </div>
                {
                    !isPreview && (
                        <div className="ml-md-auto mb-md-3">
                            {date}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export const BlogPost2Template = ({
    altCover,
    date,
    title,
    author,
    image,
    body,
    isPreview = false
}) => {
    return (
        <div
            id="blog-post">
            <section
                className="jumbotron jumbotron-fluid px-3 px-md-5 py-0 m-0 position-relative bg-white">
                <div className="px-md-5">
                    <img
                        className="img-fluid jumbo__cover w-100 position-relative shadow-sm bg-2"
                        src={image}
                        alt={altCover} />
                </div>
            </section>
            <div className="container bg-white blog-post__container pr-2">
                <div
                    className="blog-post__author-content mx-auto">
                    <ItemAuthor
                        image={getImage(author, "photoBig")}
                        alt={author.alt}
                        name={author.name}
                        date={date}
                        isPreview={isPreview} />
                </div>
                <h2 className="my-3 mt-md-5 mb-mb-0 font-weight-bold blog-post__body">
                    {title}
                </h2>
                <div
                    className="position-relative py-3 p-md-5 blog-post__body" dangerouslySetInnerHTML={{ __html: converter.makeHtml(body) }} />
            </div>
        </div>
    )
}

const BlogPost2 = ({
    location,
    data
}) => {
    const { altCover, date, title, author } = data.markdownRemark.frontmatter;
    const posts = data.allMarkdownRemark.edges;

    const image = getImage(data.markdownRemark.frontmatter, "coverImage");

    const body = data.markdownRemark.html;

    return (
        <TemplateWrapper2 location={location}>
            <>
                <BlogPost2Template
                    altCover={altCover}
                    date={date}
                    title={title}
                    author={author}
                    image={image}
                    body={body} />
                <div
                    style={{ top: "-4rem" }}
                    className="container position-relative bg-white py-3 px-3 px-md-5">
                    <div>
                        <h2 className="text-center mb-0 font-weight-bold">Últimas publicaciones</h2>
                    </div>
                    <div className="row">
                        {
                            posts.map((item, index) => (
                                <div
                                    style={{ height: "150px" }}
                                    className="col-md-6 col-lg-4 mt-4">
                                    <Post
                                        title={item.node.frontmatter.title}
                                        authorName={item.node.frontmatter.author.name}
                                        date={item.node.frontmatter.date}
                                        slug={item.node.fields.slug}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
        </TemplateWrapper2>
    )
}

export default BlogPost2

export const blogpost2Query = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        }
      frontmatter {
        coverImage {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        listImage {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        altList
        altCover
        title
        description
        date(formatString: "DD MMMM YYYY")
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
      }
    }

    allMarkdownRemark(
        limit: 3
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
                date(formatString: "DD MMMM YYYY")
                author {
                    name
                }
            }
          }
        }
      }
  }
`