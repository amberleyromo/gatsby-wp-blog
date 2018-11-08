import React from "react";
import styled from "react-emotion";
import WeeklyItem from "../WeeklyItem";

const WeeklyItems = styled("div")`
  margin: 1rem 0rem;
  border: thin solid #e3e3e3;
  padding: 0.25rem 1.5rem;
  background: #fdfdfd;
`;

const filterResources = (resources, type) => {
  return resources.filter(resource => {
    const { contentType, resourceType } = resource.node.fields;
    return contentType === "resources" && resourceType === type;
  });
};

const WeeklyContentItems = ({ className, resources }) => (
  <WeeklyItems className={className}>
    <h2>Reads</h2>
    {filterResources(resources, "articles").map(article => {
      return <WeeklyItem content={article} />;
    })}
    {filterResources(resources, "reads").map(read => {
      return <WeeklyItem content={read} />;
    })}
    <h2>Finds</h2>
    {filterResources(resources, "tools").map(tool => {
      return <WeeklyItem content={tool} />;
    })}
    {filterResources(resources, "podcasts").map(podcast => {
      return <WeeklyItem content={podcast} />;
    })}
    <h2>Writes</h2>
    {filterResources(resources, "writes").map(write => {
      return <WeeklyItem content={write} />;
    })}
  </WeeklyItems>
);

export default WeeklyContentItems;
