import React from "react";
// import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../Header";
import { injectGlobal } from "react-emotion";

injectGlobal`
  @media only screen and (max-width: 340px) {
    html {
      font-size: 100%;
    }
  }

  .visually-hidden { /* https://snook.ca/archives/html_and_css/hiding-content-for-accessibility */
    position: absolute !important;
    height: 1px; width: 1px; 
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }

  a:hover, a:focus, a > code:hover {
    background-color: rgb(244,153,133);
    color: #fff;
    padding: 1px;
  }

  figure, img {
    width: 100% !important;
    height: auto !important;
  }

  code, pre {
    background-color: #f5fefe;
    border: #decede solid .5px;
  }

  pre {
    overflow-x: scroll;
    padding: 12px;
  }

  code {
    padding: 4px 2px 4px;
  }

  a > code:hover {
    border: none;
  }
`;

class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title="Amberley Dot Blog"
          meta={[
            {
              name: "description",
              content: "Writings and collection from Amberley Romo"
            },
            {
              name: "keywords",
              content: "blog, tech, code, development, knitting"
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

// DefaultLayout.propTypes = {
//   location: PropTypes.object.isRequired
// };

export default DefaultLayout;
