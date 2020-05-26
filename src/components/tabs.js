import React, { useState } from "react";
import styled, { css } from "styled-components"

const TabOptions = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Option = styled.button`
    border: 1px solid #0F29F6;
    border-left: ${props => props.active ? '1px solid #0F29F6' : props.disabled ? '2px solid transparent' : '1px solid white'};
    border-right: ${props => props.active ? '1px solid #0F29F6' : props.disabled ? '2px solid transparent' : '1px solid white'};
    border-top: ${props => props.active ? '1px solid #0F29F6' : props.disabled ? '2px solid transparent' : '1px solid white'};
    border-bottom: ${props => props.active ? 'none' : props.disabled ? '1px solid rgba(148, 152, 155, 0.5)' : '1px solid black'};
    height: 50px;
    width: 266.666px;
    border-radius: 15px 35px 0px 0px;
    background-color: ${props => props.active ? '#0F29F6' : props.disabled ? '#f2f2f2' : 'white'};
    color: ${props => props.active ? 'white' : props.disabled ? 'rgba(148, 152, 155, 0.5)' : 'black'};
    top: 10px;
    left: 1px;
    display: inline-block;
    z-index: 2;
    outline: none;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    ${props => !props.disabled && css`
        &:hover {
            background-color: #DCE0FD;
            color: black;
        };
        &:focus {
            background-color: #DCE0FD;
            color: black;
        }
        border: 1px solid grey;
  `}
`;


const TabBody = styled.div`
    padding: 30px 15px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
`;

export const PlainTabNavigation = ({ className, tabs }) => {
    console.log('tabs are', tabs);
    const [selectedTab, setSelectedTab] = useState(tabs[0].label);
    const { TabContent } = tabs.find(x => x.label === selectedTab)
    return (
        <div className={className}>
            <TabOptions>
                {tabs.map(tab => (
                    <Option
                        id={tab.label}
                        key={tab.label}
                        onClick={() => setSelectedTab(tab.label)}
                        active={selectedTab === tab.label}
                        disabled={tab.disabled}
                    >
                        {tab.label}
                    </Option>
                ))}
            </TabOptions>
            <TabBody>
                <TabContent />
            </TabBody>
        </div>
    );
};

export const TabNavigation = styled(PlainTabNavigation)`
    width: 800px;
    margin: 0 auto;
`