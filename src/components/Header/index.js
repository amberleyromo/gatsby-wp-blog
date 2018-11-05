import React from "react";
import { Link } from "gatsby";
import styled from "react-emotion";

const HeaderWrapper = styled("header")`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: 10px;

  > * {
    grid-column: 2/3;
  }
`;

const Header = () => (
  <HeaderWrapper>
    <h1>
      <Link to="/">Howdy. I'm Amberley.</Link>
    </h1>
    <h2>
      <a href="https://github.com/amberleyromo">Front-end dev</a>,{" "}
      <a href="https://www.ravelry.com/people/amberleyknits">yarn nerd</a>.{" "}
      <a href="https://twitter.com/amberleyjohanna">Sometimes-tweeter</a>.
    </h2>
  </HeaderWrapper>
);

export default Header;
