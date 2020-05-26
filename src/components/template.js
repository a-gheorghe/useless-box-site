import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { TabNavigation } from '../components/tabs';
import { Layout } from '../components/layout';
import Prism from 'prismjs';

const Video = styled.video`
    border: 3px solid black;
    margin: 0 auto;
    width: 700px;
    display: block; 
`;

const MediaDescription = styled.caption`
    padding-bottom: 60px;
    padding-top: 20px;
    display: block;
    margin: 0 auto;
    width: 700px;
    text-align: left;
    font-size: 16px;
    `;

const Image = styled.img`
    height: 400px;
    display: block;
    border: 3px solid black;
    margin: 0 auto;
`

const Description = ({ description, media }) => (
    <>
        <div>{description}</div>
        <h2> Media </h2>
        {media.map(item => {
            console.log('ITEM IS', item);
            return item.file.contentType.includes('video') ?
                <>
                    <Video controls width="700" height="400">
                        <source src={item.file.url} type="video/mp4" />
                        <source src={item.file.url} type="video/ogg" />
                        Your browser does not support the video tag.
                    </Video>
                    <MediaDescription> {item.description} </MediaDescription>
                </>
                :
                <>
                    <Image src={item.file.url} />
                    <MediaDescription> {item.description} </MediaDescription>
                </>
        })}
    </>
);


const Code = ({ code }) => {
    useEffect(() => {
        Prism.highlightAll()
    });
    return(
        <pre><code className="language-python">{code}</code></pre>
    );
}
const CircuitDiagram = ({ circuitDiagram, circuitDescription }) => (
    <>
        <img src={circuitDiagram} />
        <div> {circuitDescription} </div>
    </>
);

const Template = ({ data }) => {

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <strong>{text}</strong>,
    },

    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
          console.log('node node node', node);
        const { file } = node.data.target.fields;
        const { url } = file["en-US"];
        return <img src={url} />;
      },
    },
  };

    const item = data.allContentfulRecipe.nodes[0];

    const title = item.title ? item.title : null;
    const description = item.description ? documentToReactComponents(item.description.json, options) : null;
    const circuitDescription = item.circuitDescription ? documentToReactComponents(item.circuitDescription.json, options) : null;
    const circuitDiagram = item.circuitDiagram ? item.circuitDiagram.fluid.src : null;
    const code = item.code ? item.code.childMarkdownRemark.rawMarkdownBody : null;
    const mediaArray = item.recipePhotos ? item.recipePhotos : [];

  const tabs = [
        {
            label: 'Circuit Diagram',
            TabContent: () => <CircuitDiagram circuitDiagram={circuitDiagram} circuitDescription={circuitDescription} />,
            disabled: !circuitDiagram
        },
        {
            label: 'Code',
            TabContent: () => <Code code={code} />,
            disabled: !code
        },
        {
            label: 'Description',
            TabContent: () => <Description description={description} media={mediaArray} />,
            disabled: !description
        }
  ];
  return (
    <Layout>
        {title && <h1>{title}</h1>}
        <TabNavigation tabs={tabs} />
    </Layout>
  );
};
export default Template;

export const query = graphql`
    query($slug: String!) {
            allContentfulRecipe(filter: {
                slug: {eq: $slug},
                node_locale: {eq: "en-US"}
            })  
        {
                nodes {
                    slug
                    title
                    step
                    description {
                        json
                    }
                    circuitDescription {
                        json
                    }
                    code {
                        childMarkdownRemark {
                            rawMarkdownBody
                        }
                    }
                    circuitDiagram {
                        fluid {
                            src
                        }
                    }
                    recipePhotos {
                        description
                        file {
                          url
                          contentType
                        }
                      }
                }
            }
        }
`;