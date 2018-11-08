import React, { Component } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import WeeklyItems from "../components/WeeklyItems";
import styled from "react-emotion";

const Weekly = styled("article")`
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

const Items = styled(WeeklyItems)`
  grid-area: p;

  > p:first-of-type {
    font-style: italic;
    font-size: 26px;
    line-height: 2;
  }
`;

class WeeklyTemplate extends Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark;
    const weekly = edges.filter(edge => {
      return edge.node.fields.contentType === "weeklies";
    })[0].node;

    const resources = edges.filter(edge => {
      return edge.node.fields.contentType === "resources";
    });

    return (
      <Layout>
        <Weekly>
          <Intro>
            <Title>{`${weekly.frontmatter.title}`}</Title>
          </Intro>
          <Items resources={resources} />
        </Weekly>
      </Layout>
    );
  }
}

export default WeeklyTemplate;

export const pageQuery = graphql`
  query WeeklyQuery($edition: Int) {
    allMarkdownRemark(filter: { frontmatter: { edition: { eq: $edition } } }) {
      edges {
        node {
          frontmatter {
            edition
            title
            sourceUrl
            author
            authorLink
          }
          fields {
            contentType
            resourceType
          }
          html
        }
      }
    }
  }
`;
