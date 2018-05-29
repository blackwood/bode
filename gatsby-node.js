// const Promise = require("bluebird");
// const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
//   const { createNodeField } = boundActionCreators;
//   console.log(node.internal.type);
//   if (node.internal.type === `googleSheetMainRow`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` });
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug
//     });
//   }
// };

// exports.createPages = ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators;
//   console.log("IN NODE", process.env.NODE_ENV);
//   return new Promise((resolve, reject) => {
//     graphql(
//       `
//         {
//           allGoogleSheetMainRow {
//             edges {
//               node {
//                 id
//                 name
//                 val
//                 goodJob
//               }
//             }
//           }
//         }
//       `
//     ).then(result => {
//       if (result.errors) {
//         reject(result.errors);
//       }
//       result.data.allGoogleSheetMainRow.edges.forEach(({ node }) => {
//         createPage({
//           path: node.fields.slug,
//           component: path.resolve(`./src/layouts/index.js`),
//           context: {
//             // Data passed to context is available in page queries as GraphQL variables.
//             slug: node.fields.slug
//           }
//         });
//       });
//       resolve();
//     });
//   });
// };
// // can get working from this example?
// new Promise()
//   .then(result => {
//     console.log(result);
//     if (result.errors) {
//       reject(result.errors);
//     }

//     // Create Product pages
//     // We want to create a detailed page for each
//     // product node. We'll just use the Contentful id for the slug.
//     _.each(result.data.allContentfulProduct.edges, edge => {
//       // Gatsby uses Redux to manage its internal state.
//       // Plugins and sites can use functions like "createPage"
//       // to interact with Gatsby.
//       createPage({
//         // Each page is required to have a `path` as well
//         // as a template component. The `context` is
//         // optional but is often necessary so the template
//         // can query data specific to each page.
//         path: `/products/${edge.node.id}/`,
//         component: slash(productTemplate),
//         context: {
//           id: edge.node.id
//         }
//       });
//     });
//     resolve();
//   })
//   .then(() => {
//     graphql(
//       `
//         {
//           allContentfulCategory(limit: 1000) {
//             edges {
//               node {
//                 id
//               }
//             }
//           }
//         }
//       `
//     ).then(result => {
//       if (result.errors) {
//         reject(result.errors);
//       }

//       // Create Category pages
//       const categoryTemplate = path.resolve(`./src/templates/category.js`);
//       // We want to create a detailed page for each
//       // category node. We'll just use the Contentful id for the slug.
//       _.each(result.data.allContentfulCategory.edges, edge => {
//         // Gatsby uses Redux to manage its internal state.
//         // Plugins and sites can use functions like "createPage"
//         // to interact with Gatsby.
//         createPage({
//           // Each page is required to have a `path` as well
//           // as a template component. The `context` is
//           // optional but is often necessary so the template
//           // can query data specific to each page.
//           path: `/categories/${edge.node.id}/`,
//           component: slash(categoryTemplate),
//           context: {
//             id: edge.node.id
//           }
//         });
//       });

//       resolve();
//     });
//   });
