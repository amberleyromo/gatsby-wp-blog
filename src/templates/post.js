import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import PostIcons from "../components/PostIcons";
import styled from "react-emotion";

const Article = styled("article")`
  display: grid;
  grid-template-columns: 1fr minmax(200px, 4fr) 1fr;
  grid-gap: 10px;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "t t ."
    ". p ."
    ". n .";

  > figure {
    grid-column: 1 / -1;
    margin: 20px 0;
  }

  > blockquote {
    grid-column: 3 / 5;
    padding-left: 10px;
    color: #666;
    border-left: 3px solid black;
  }

  > aside {
    grid-column: 5;
  }
`;

const Intro = styled("div")`
  grid-area: t;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 247, 243);
  margin: 0.6rem 0 0.8rem 0;
  padding-left: 6%;
`;

const Title = styled("h1")`
  grid-column: 2/3;
  margin: 0.6rem 0 0.4rem 0;
`;

const Post = styled("div")`
  grid-area: p;

  > p:first-of-type {
    font-style: italic;
    font-size: 26px;
    line-height: 2;
  }
`;

const PostNav = styled("div")`
  grid-area: n;
  text-align: center;
  padding: 1.6rem 0 1.8rem;
  background-color: rgb(248, 248, 248);
`;

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost;

    return (
      <Layout>
        <Article>
          <Intro>
            <Title dangerouslySetInnerHTML={{ __html: post.title }} />
            <PostIcons className="post-date" node={post} />
          </Intro>
          <Post
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <PostNav>{this.renderPostNav()}</PostNav>
        </Article>
      </Layout>
    );
  }

  renderPostNav() {
    var prev = this.props.pathContext.prevSlug;
    var next = this.props.pathContext.nextSlug;

    if (prev && !next) {
      return <Link to={prev}>previous</Link>;
    }

    if (prev && next) {
      return (
        <span>
          <Link to={prev}>previous</Link> | <Link to={next}>next</Link>
        </span>
      );
    }

    if (next && !prev) {
      return <Link to={next}>next</Link>;
    }

    return;
  }
}
//<img src={post.image.sizes.thumbnail} />

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array
};

export default PostTemplate;

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
`;
