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
    font-size: 14px;
    line-height: 1.4;
    box-sizing: border-box;
    position: relative;
    height: 157.5px;
    margin-bottom: 8px;
    background-color: #eceff1;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url(https://2.bp.blogspot.com/-2RewSLZUzRg/U-9o6SD4M6I/AAAAAAAADIE/voax99AbRx0/s1600/14%2B-%2B1%2B%281%29.jpg);
`;

const SidebarImageContainer = styled.div`
    font-size: 14px;
    box-sizing: border-box;
`;

const SidebarImage = styled.img`
    font-size: 14px;
    line-height: 1.4;
    box-sizing: border-box;
    border-style: none;
    width: 54px;
    height: 54px;
    margin: 16px;
    border-radius: 50%;
`;

const SidebarName = styled.div`
    font-size: 14px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    height: 48px;
    line-height: 48px;
    padding: 0 56px 0 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
            <SidebarImageContainer>
                <SidebarImage src={profilePhoto} alt="photo of Ana-Stefania Gheorghe with her golden retriever dog" />
                <SidebarName> Ana-Stefania Gheorghe</SidebarName>
            </SidebarImageContainer>
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