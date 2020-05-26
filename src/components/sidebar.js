import React from "react"
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from "gatsby"

const Aside = styled.aside`
    font-size: 14px;
    line-height: 1.4;
    color: #212121;
    box-sizing: border-box;
    vertical-align: top;
    position: relative;
    display: block;
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    border: none;
    background-color: #fff;
    min-width: 280px;
    width: 280px;
`;

const SidebarHeader = styled.div`
    position: relative;
    height: 157.5px;
    color: white;
    background-color: #15193B;
    margin-bottom: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SidebarImage = styled.img`
    flex: 1;
    font-size: 14px;
    line-height: 1.4;
    box-sizing: border-box;
    border-style: none;
    max-width: 65px;
    max-height: 65px;
    margin-left: 16px;
    margin-right: 16px;
    border-radius: 50%;
    align-self: center;
    margin-bottom: 0;
`;

const SidebarName = styled.div`
    flex: 1;
    line-height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline;
    font-size: 16px;
    align-self: center;
`;

const SidebarUnorderedList = styled.ul`
    font-size: 14px;
    line-height: 1.4;
    color: #212121;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
`;

const SidebarListItem = styled.li`
    font-size: 14px;
    line-height: 1.4;
    color: #212121;
    box-sizing: border-box;
    position: relative;
    list-style-type: none;
    &:hover {
        background-color: #DCE0FD;
    }
    &:focus {
        background-color: #DCE0FD;
    }
`;

const SidebarInnerList = styled.ul`
    padding-left: 16px;
    margin: 0;
    &:before {
        content: attr(title);
        /* then add some nice styling as needed, eg: */
        display: block;
        font-weight: bold;
        padding-bottom: 20px;
    }
    `;

const SidebarLink = styled(Link)`
font-size: 14px;
list-style-type: none;
box-sizing: border-box;
position: relative;
cursor: pointer;
display: block;
height: 48px;
line-height: 48px;
padding: 0 56px 0 16px;
text-decoration: none;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
color: #212121;
outline: none;
&:hover {
    text-decoration: none;
    border: 2px dashed #0F29F6;
}

&:focus {
    border: 2px dashed #0F29F6;
}
`

const activeStyle = {
    'backgroundColor': '#0F29F6',
    'color': 'white',
}

export const Sidebar = ({ className }) => {
    const data = useStaticQuery(graphql`
        {
        recipe: allContentfulRecipe(filter: {node_locale: {eq: "en-US"}}, sort: {fields: step})  {
          nodes {
            slug
            title
          }
        }
        profile: allContentfulAsset(filter: {title: {eq: "Ana Gheorghe"}, node_locale: {eq: "en-US"}}) {
            edges {
              node {
                file {
                  url
                }
              }
            }
          }
      }
    `);
    const recipes = data.recipe.nodes;
    const profilePhoto = data.profile.edges[0].node.file.url;
    return (
    <Aside>
        <SidebarHeader>
                <SidebarImage src={profilePhoto} alt="photo of Ana-Stefania Gheorghe with her golden retriever dog" />
                <SidebarName> Ana-Stefania Gheorghe</SidebarName>
        </SidebarHeader>
        <SidebarUnorderedList>
            <SidebarListItem>
                <SidebarLink
                    to={`/`}
                    activeStyle={activeStyle}
                >
                    Home
                </SidebarLink>
            </SidebarListItem>
            <SidebarInnerList title="Steps">
            {recipes.map(recipe => (
                <SidebarListItem>
                    <SidebarLink
                        key={recipe.slug}
                        to={`/${recipe.slug}`}
                        activeStyle={activeStyle}
                    >
                        {recipe.title}
                    </SidebarLink>
                </SidebarListItem>
            ))}
            </SidebarInnerList>
        </SidebarUnorderedList>
      </Aside>
    )
};