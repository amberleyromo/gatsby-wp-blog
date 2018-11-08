import React from "react";
import styled from "react-emotion";

const WeeklyItem = styled("div")`
  background-color: rgb(255, 247, 243);
  padding: 0.25rem 1.5rem 0.25rem 1.5rem;
  margin-top: 1rem;
`;

const WeeklyContentItem = ({ content }) => (
  <WeeklyItem>
    <h3>
      <a href={`${content.node.frontmatter.sourceUrl}`}>
        {content.node.frontmatter.title}
      </a>
    </h3>
    <p>
      {}
      {`[${content.node.fields.resourceType}] | By `}
      <a href={`${content.node.frontmatter.authorLink}`}>
        {content.node.frontmatter.author}
      </a>
    </p>
    <div
      className="blog-post-content"
      dangerouslySetInnerHTML={{ __html: content.node.html }}
    />
  </WeeklyItem>
);

export default WeeklyContentItem;
