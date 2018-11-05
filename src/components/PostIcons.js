import React from "react";
import { FaClock as ClockIcon } from "react-icons/fa";

export default ({ node, className = `postIcon` }) => (
  <div className={className}>
    <span>
      <ClockIcon size={14} />
      {` `}
      {node.date}
    </span>
  </div>
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
