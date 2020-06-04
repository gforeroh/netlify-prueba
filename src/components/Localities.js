import React from 'react'
import { StaticQuery } from 'gatsby';
import { graphql } from 'gatsby';

const Localities = ({
    localities
}) => {
    console.log('localities :>> ', localities);
    return (
        <div className="row">
            {
                localities.map((locality, index) => (
                    <div
                        key={`locality-${index}`}
                        className="col-6 col-lg-4 mb-3 mb-lg-0">
                        <div className="font-weight-bold">{locality.name}</div>
                        <div>{locality.address}</div>
                        <div>{locality.phone}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default props => (
    <StaticQuery
        query={graphql`
        query Localities {
            markdownRemark(frontmatter: { templateKey: { eq: "about-us" } }) {
                frontmatter {
                    section4 {
                        offices {
                            name
                            phone
                            address
                        }
                    }
                }
            }
        }
      `}
        render={(data, count) => <Localities localities={data.markdownRemark.frontmatter.section4.offices} count={count} {...props} />}
    />
)