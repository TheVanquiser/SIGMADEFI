import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input } from '@mui/material'
import styled from 'styled-components';
import {
    TextField,
    Button, Stack, LinearProgress
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Principal } from '@dfinity/principal';
export const plug = (window as any).ic?.plug;

const CreateToken = () => {

    const [recipientData, setRecipientData] = useState('')



    const handleTokenCreation = async () => {

    }

    return (

        <ContractComponent>
            <Wrapper>
                <div>
                    <Stack mx='auto' spacing={3} minWidth='auto' >
                        <FormControl component="fieldset">
                            <FormLabel component="legend"> Create DIP 20 </FormLabel>
                        </FormControl>
                        <TextField
                            id="outlined-basic"
                            label="Name Token"
                            variant="outlined"
                            value={recipientData}
                            onChange={(e) => setRecipientData(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Symbol Token"
                            variant="outlined"
                            value={recipientData}
                            onChange={(e) => setRecipientData(e.target.value)}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Decimals Token"
                            variant="outlined"
                            value={recipientData}
                            onChange={(e) => setRecipientData(e.target.value)}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Total Supply Token"
                            variant="outlined"
                            value={recipientData}
                            onChange={(e) => setRecipientData(e.target.value)}
                        />

                        <Button onClick={handleTokenCreation}>
                            {<AddIcon />}
                        </Button>

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

export default CreateToken;