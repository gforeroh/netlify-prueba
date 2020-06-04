import React from 'react'
import PropTypes from 'prop-types'
import { BlogPost2Template } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
    const data = entry.getIn(['data']).toJS()
    const {altCover, date, title, author, body} = data;
    const image = data.coverImage;

    return (
        <BlogPost2Template 
            altCover={altCover} 
            date={date} 
            title={title} 
            author={author} 
            image={image} 
            body={body}
            isPreview={true}
        />
    )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview