import React, { Component } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import PostIcons from "../components/PostIcons";

class Home extends Component {
  render() {
    const data = this.props.data;

    return (
      <Layout>
        <div className="home">
          <h2 className="visually-hidden">Recent Posts</h2>
          {data.allWordpressPost.edges.map(({ node }) => (
            <div className="post-node" key={node.slug}>
              <h3>
                <Link to={node.slug}>{node.title}</Link>
              </h3>
              <PostIcons className="post-date" node={node} />
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          ))}
          <div className="more-posts">
            <p>
              <a href="/posts">More Posts >></a>
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;

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
    allWordpressPost(limit: 3) {
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
