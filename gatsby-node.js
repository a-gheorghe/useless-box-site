const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      recipe: allContentfulRecipe {
        nodes {
          slug
        }
      }
    }
  `);

  // creates pages Menu
  data.recipe.nodes.forEach(item => {
    createPage({
      path: `/${item.slug}`,
      component: path.resolve('./src/components/template.js'),
      context: {
        slug: item.slug,
      },
    });
  });
}