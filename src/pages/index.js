import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import TagIcon from 'react-icons/lib/fa/tag'
import OpenIcon from 'react-icons/lib/fa/folder-open'
import PostIcons from '../components/PostIcons'

import { rhythm } from '../utils/typography'

class Home extends Component {
  render() {
    const data = this.props.data

    return (
      <div className="home">
        <h2 className="visually-hidden">Posts</h2>
        {data.allWordpressPost.edges.map(({ node }) => (
          <div key={node.slug}>
            <h3>
              <Link to={node.slug}>{node.title}</Link>
            </h3>
            <PostIcons node={node} />
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        ))}
      </div>
    )
  }
}

export default Home

export const pageQuery = graphql`
  query homePageQuery {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
        }
      }
    }
  }
`
