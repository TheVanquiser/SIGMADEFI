import React from 'react'

import { FormControl, FormLabel, Input } from '@mui/material'
import styled from 'styled-components';
import {
    TextField,
    Button, Stack, LinearProgress
} from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'

const GenerateNft: React.FunctionComponent = () => {
    return (

    <ContractComponent>
        <Wrapper>
            <div>
                <Stack mx='auto' spacing={3} minWidth='auto' >
                    
                </Stack>
            </div>
        </Wrapper>
    </ContractComponent>
)
}

const ContractComponent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 50%;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: -10vh;
padding: 40px 60px;
border-radius: 20px;
max-width: auto;
color: #ffffff;
font-size: 1.5rem;
background: #ffffff;
box-shadow: 2px 8px 10px 4px rgba(0, 0, 0, 0.3);

  
`;

export default GenerateNft;