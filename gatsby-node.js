const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const parseFilepath = require(`parse-filepath`);
const slash = require(`slash`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let parentFileNode = getNode(node.parent);
  if (
    node.internal.type === `MarkdownRemark` &&
    parentFileNode.internal.type === `File`
  ) {
    const parsedFilePath = parseFilepath(parentFileNode.relativePath);

    if (parentFileNode.sourceInstanceName === `weeklies`) {
      let slug = `/weeklies/${node.frontmatter.edition}/`;
      createNodeField({ node, name: `slug`, value: slug });
      createNodeField({ node, name: `contentType`, value: `weeklies` });
    }

    if (parentFileNode.sourceInstanceName === `resources`) {
      // dir is `/resourceType/resourcePath`
      const [resourceType, resourcePath] = parsedFilePath.dir.split("/");
      let slug = `/${resourceType}/${resourcePath}/`;
      createNodeField({ node, name: `slug`, value: slug });
      createNodeField({
        node,
        name: `contentType`,
        value: `resources`
      });
      createNodeField({
        node,
        name: `resourceType`,
        value: resourceType
      });
    }
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    // ==== WP PAGES ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const pageTemplate = path.resolve(`./src/templates/page.js`);
        _.each(result.data.allWordpressPage.edges, edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: slash(pageTemplate),
            context: {
              id: edge.node.id
            }
          });
        });
      }) // ==== END PAGES ====

      // ==== WP POSTS ====
      .then(() => {
        graphql(
          `
            {
              allWordpressPost {
                edges {
                  node {
                    id
                    slug
                    status
                    template
                    format
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }

          const postTemplate = path.resolve(`./src/templates/post.js`);
          const posts = result.data.allWordpressPost.edges;

          _.each(posts, (edge, i) => {
            var prev = posts[i - 1] ? posts[i - 1].node.slug : null;
            var next = posts[i + 1] ? posts[i + 1].node.slug : null;
            createPage({
              path: edge.node.slug,
              component: slash(postTemplate),
              context: {
                id: edge.node.id,
                prevSlug: prev,
                nextSlug: next
              }
            });
          });
          // resolve();
        });
      }) // ==== END POSTS ====

      // ==== WEEKLIES ====
      .then(() => {
        graphql(
          `
            {
              allMarkdownRemark(
                filter: { fields: { contentType: { eq: "weeklies" } } }
              ) {
                edges {
                  node {
                    id
                    fields {
                      slug
                    }
                    frontmatter {
                      edition
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }

          const weeklyTemplate = path.resolve(`./src/templates/weekly.js`);
          const weeklies = result.data.allMarkdownRemark.edges;

          _.each(weeklies, edge => {
            createPage({
              path: edge.node.fields.slug,
              component: slash(weeklyTemplate),
              context: {
                id: edge.node.id,
                edition: edge.node.frontmatter.edition
              }
            });
          });
          resolve();
        });
      }); // ==== END WEEKLIES ====
  });
};
