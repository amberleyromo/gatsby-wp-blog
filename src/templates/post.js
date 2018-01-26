import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostIcons from '../components/PostIcons'
import Img from 'gatsby-image'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <article>
        <div className="post-intro">
          <h1 className="post-title" dangerouslySetInnerHTML={{ __html: post.title }} />
          <PostIcons className="post-date" node={post} />
        </div>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="post-nav">
          {this.renderPostNav()}
        </div>
      </article>
    )
  }

  renderPostNav() {
    var prev = this.props.pathContext.prevSlug;
    var next = this.props.pathContext.nextSlug;

    if (prev && !next) {
      return (<Link to={prev}>previous</Link>);
    }

    if (prev && next) {
      return (<span><Link to={prev}>previous</Link> | <Link to={next}>next</Link></span>)
    }

    if (next && !prev) {
      return (<Link to={next}>next</Link>)
    }

    return;
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
