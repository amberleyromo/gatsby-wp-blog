import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostIcons from '../components/PostIcons'
import Img from 'gatsby-image'

import { rhythm } from '../utils/typography'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <article>
        <section>
          <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
          <PostIcons node={post} />
        </section>

        <section>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>
      </article>
    )
  }
}
//<img src={post.image.sizes.thumbnail} />

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
