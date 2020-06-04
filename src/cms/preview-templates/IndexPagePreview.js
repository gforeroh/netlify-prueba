import React from 'react'
import PropTypes from 'prop-types'
import { LandingTemplate } from '../../templates/landing';

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  const { 
    header,
    section1,
    section2,
    section3,
    section4,
    section5,
  } = data;

  if (data) {
    return (
      <LandingTemplate
        header={header}
        section1={section1}
        section2={section2}
        section3={section3}
        section4={section4}
        section5={section5}
        isPreview={true}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview