import React from 'react'
import styled from 'styled-components'
import MultiSender from '../components/multisender'

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
    
`;

const Multisender: React.FunctionComponent = () => {
    return (
            <Content>
                < MultiSender/>
            </Content>
    )
}

export default Multisender
