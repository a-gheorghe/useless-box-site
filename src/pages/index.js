import React from "react"
import { Layout } from "../components/layout";
import { Helmet } from 'react-helmet';
import { graphql} from "gatsby"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';



const App = ({ data }) => {
    console.log('data', data);

    const options = {
        renderMark: {
          [MARKS.BOLD]: text => <strong>{text}</strong>,
        },
    
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
        },
      };
    return (
        <>
            <Helmet>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-python.min.js"></script>
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
                <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
            </Helmet>
            <Layout>
                <h1>{data.allContentfulIntroduction.edges[0].node.title}</h1>
                {documentToReactComponents(data.allContentfulIntroduction.edges[0].node.childContentfulIntroductionContentRichTextNode.json, options)}
            </Layout>
        </>
        );
    }

export default App;

export const query = graphql`{
    allContentfulIntroduction(filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            title
            childContentfulIntroductionContentRichTextNode {
              json
            }
          }
        }
      }
    }
`;
