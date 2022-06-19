import React from 'react'
import styled from 'styled-components'
import CreateToken from '../components/create-token';

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
    
`;

const CreateDIP20: React.FunctionComponent = () => {
    return (
        <Content>
            < CreateToken />
        </Content>
    )
}

export default CreateDIP20
