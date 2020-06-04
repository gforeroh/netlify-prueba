import React from 'react'
import PropTypes from 'prop-types'
import { BlogPageTemplate } from '../../templates/blog-page';

const BlogPagePreview = ({ entry, widgetFor }) => {
    const data = entry.getIn(['data']).toJS()
    const {
        title,
        desc
    } = data;

    console.log('data BlogPagePreview:>> ', data);

    return (
        <BlogPageTemplate
            title={title}
            desc={desc} />
    )
}

BlogPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default BlogPagePreview