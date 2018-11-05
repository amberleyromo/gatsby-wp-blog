import React, { Component } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import PostIcons from "../components/PostIcons";
import styled from "react-emotion";

const PostsWrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-gap: 10px;
`;

const Post = styled("div")`
  grid-column: 2/4;
`;

class Posts extends Component {
  render() {
    const data = this.props.data;

    return (
      <Layout>
        <PostsWrapper>
          <h2 className="visually-hidden">Posts</h2>
          {data.allWordpressPost.edges.map(({ node }) => (
            <Post key={node.slug}>
              <h3>
                <Link to={node.slug}>{node.title}</Link>
              </h3>
              <PostIcons className="post-date" node={node} />
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </Post>
          ))}
        </PostsWrapper>
      </Layout>
    );
  }
}

export default Posts;

export const pageQuery = graphql`
  query postsPageQuery {
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
`;
