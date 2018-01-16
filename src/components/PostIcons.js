import React from 'react'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import TagIcon from 'react-icons/lib/fa/tag'
import OpenIcon from 'react-icons/lib/fa/folder-open'

import { rhythm } from '../utils/typography'

export default ({ node, className = `postIcon` }) => (
  <div className={className}>
    <span>
      <ClockIcon size={14} />
      {` `}
      {node.date}
    </span>
  </div>
)

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
`
