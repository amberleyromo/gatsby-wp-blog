import React, { Component } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import PostIcons from "../components/PostIcons";

class Posts extends Component {
  render() {
    const data = this.props.data;

    return (
      <Layout>
        <div className="posts">
          <h2 className="visually-hidden">Posts</h2>
          {data.allWordpressPost.edges.map(({ node }) => (
            <div className="post-node" key={node.slug}>
              <h3>
                <Link to={node.slug}>{node.title}</Link>
              </h3>
              <PostIcons className="post-date" node={node} />
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          ))}
        </div>
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
