import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Header from '../components/Header'
import './index.css'

import { rhythm, scale } from '../utils/typography'

class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>{this.props.children()}</main>
      </div>
    )
  }
}

DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default DefaultLayout
