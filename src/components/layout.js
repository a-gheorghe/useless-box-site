import React from "react";
import { Sidebar } from '../components/sidebar';
import styled from 'styled-components';

const Content = styled.main`
  background-color: white;
  flex: 1;
  padding: 30px;
`;

const Page = styled.div`
    display: flex;
`;


export const Layout = ({ children }) => {
    return(
        <>
            <Page>
                <Sidebar />
                <Content>{children}</Content>
            </Page>
        </>
    )
}