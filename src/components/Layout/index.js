import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../Header";
import "./layout.css";

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

DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired
};

export default DefaultLayout;
