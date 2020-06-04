import React from 'react'
import PropTypes from 'prop-types'
import { AboutUsTemplate } from '../../templates/about-us';

const AboutUsPreview = ({ entry, widgetFor }) => {
    const data = entry.getIn(['data']).toJS()
    const {
        section1,
        section2,
        section3,
        section4,
    } = data;

    console.log('data AboutUsPreview:>> ', data);

    return (
        <AboutUsTemplate
            section1={section1}
            section2={section2}
            section3={section3}
            section4={section4}
            isPreview={true} />
    )
}

AboutUsPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default AboutUsPreview