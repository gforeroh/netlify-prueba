import React from 'react'
import PropTypes from 'prop-types'
import { LinesOfWorkTemplate } from '../../templates/lines-of-work';

const LinesOfWorkPreview = ({ entry, widgetFor }) => {
    const data = entry.getIn(['data']).toJS()
    const {
        title,
        lines,
        section2,
        testimonials,
    } = data;

    console.log('data LinesOfWorkPreview:>> ', data);

    return (
        <LinesOfWorkTemplate
            title={title}
            lines={lines}
            section2={section2}
            testimonials={testimonials} />
    )
}

LinesOfWorkPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default LinesOfWorkPreview