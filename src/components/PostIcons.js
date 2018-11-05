import React from "react";
import { FaClock as ClockIcon } from "react-icons/fa";
import styled from "react-emotion";

const Date = styled("div")`
  grid-column: 2/3;
  margin-bottom: 0.8rem;

  span {
    font-size: 0.9rem;
    color: #575757;
  }
`;

export default ({ node }) => (
  <Date>
    <span>
      <ClockIcon size={14} />
      {` `}
      {node.date}
    </span>
  </Date>
);

export const query = graphql`
  fragment PostIcons on wordpress__POST {
    date(formatString: "MMMM DD, YYYY")
    tags {
      name
    }
    categories {
      name
    }
  }
`;
