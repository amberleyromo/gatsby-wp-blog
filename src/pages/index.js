import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import PostIcons from "../components/PostIcons";
import styled from "react-emotion";

const HomeWrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 10px;

  @media (max-width: 600px) {
    grid-template-rows: auto auto auto auto;
  }
`;

const Post = styled("div")`
  grid-row: 2;

  &:first-of-type {
    grid-column: 2/4;
    grid-row: 1;
  }

  &:nth-of-type(2) {
    grid-column: 2;
    grid-gap: 10px;
    padding-right: 1rem;
  }

  @media (max-width: 600px) {
    &:nth-of-type(2),
    &:nth-of-type(3) {
      grid-column: 2/4;
      padding: 0;
    }

    &:nth-of-type(3) {
      grid-row: 3;
    }
  }
`;

const WeeklyCallout = styled("div")`
  background-color: rgb(255, 247, 243);
  grid-column: 3;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    grid-column: 2/4;
    grid-row: 3;
  }
`;

const WeeklyHeader = styled("h3")`
  align-self: flex-start;
`;

const WeeklyLink = styled("h4")`
  margin-top: 3.25rem;
`;

const MorePosts = styled("div")`
  grid-row: 3;
  grid-column: 2/4;
  margin-bottom: 4rem;

  p {
    text-align: left;
  }

  @media (max-width: 600px) {
    grid-row: 4;

    p {
      text-align: center;
    }
  }
`;

class Home extends Component {
  render() {
    const {
      allWordpressPost: wordPressPosts,
      allMarkdownRemark: featuredWeekly
    } = this.props.data;

    const {
      edition: weeklyEdition,
      title: weeklyTitle,
      excerpt: weeklyExcerpt
    } = featuredWeekly.edges[0].node.frontmatter;

    return (
      <Layout>
        <HomeWrapper>
          <h2 className="visually-hidden">Recent Posts</h2>
          {wordPressPosts.edges.map(({ node }) => (
            <Post key={node.slug}>
              <h3>
                <Link to={node.slug}>{node.title}</Link>
              </h3>
              <PostIcons className="post-date" node={node} />
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </Post>
          ))}
          <WeeklyCallout>
            <WeeklyHeader>Weekly Reads + Finds</WeeklyHeader>
            <small>A weekly (ideally, anyway) re-hash of cool shit.</small>
            <WeeklyLink>
              <Link to={`weeklies/${weeklyEdition}`}>{weeklyTitle}</Link>
            </WeeklyLink>
            <p>{weeklyExcerpt}</p>
          </WeeklyCallout>
          <MorePosts>
            <p>
              <a href="/posts">More Posts >></a>
            </p>
          </MorePosts>
        </HomeWrapper>
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
    allWordpressPost(limit: 2) {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "weeklies" } } }
      sort: { fields: [frontmatter___date], order: ASC }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            excerpt
            edition
          }
          fields {
            slug
            contentType
          }
        }
      }
    }
  }
`;
