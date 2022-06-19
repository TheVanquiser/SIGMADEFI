import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import styled from 'styled-components';
import {
	TextField,
	Button, Stack, LinearProgress
} from '@mui/material'
import { btnTextTable, messagesTable, multisenderTable, processRecipientData, } from '../helpers/utils'
import { Send as SendIcon } from '@mui/icons-material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useStore from '../helpers/store'
import { getMultiSenderPrincipal, transferToMultiSender } from '../helpers/multisenderHelper';
import { getDip20Approval, getDip20Decimals, getTotalSumOfBignumbers } from '../helpers/dip20';
import { getDip721Approval } from '../helpers/dip721';
import { Principal } from '@dfinity/principal';

export const plug = (window as any).ic?.plug;

const MultiSender = () => {

	const canistersId = useStore(state => state.canistersId);
	const setcanistersIdMsg = useStore(state => state.setCanistersIDMsg);

	const theme = useTheme();
	const aboveLarge = useMediaQuery(theme.breakpoints.up('lg'));

	const [tokenType, setTokenType] = useState('icp20')
	const [tokenPrincipal, setTokenPrincipal] = useState('')
	const [recipientData, setRecipientData] = useState('')
	const [btnText, setBtnText] = useState(btnTextTable.SEND)

	const [, setMessage1] = useState('')
	const [txnHash, setTxnHash] = useState('')

	useEffect(() => {
		if (getMultiSenderPrincipal(canistersId) === '') setcanistersIdMsg(messagesTable.NOT_SUPPORTED)
		else setcanistersIdMsg('')
	}, [canistersId, setcanistersIdMsg])

	useEffect(() => { setTxnHash('') }, [tokenType])

	const handleTokenTransfer = async () => {
		setMessage1('')
		setTxnHash('')
		if (Principal) {
			try {
				let decimals = 0
				if (tokenType === 'icp') decimals = 18
				else if (tokenType === 'dip20') {
					const decimals1 = await getDip20Decimals(tokenPrincipal)
					if (decimals1 === -1) {
						setMessage1(messagesTable.INVALID_TOKENADDRESS)
						return
					}
					decimals = decimals1
				}
				const { done, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr } = await processRecipientData(recipientData, tokenType, decimals)
				if (!done) {
					setMessage1(messagesTable.INVALID_DATA)
					return
				}
				setBtnText(btnTextTable.APPROVING)
				const totalAmountInWei = getTotalSumOfBignumbers(tokenAmountsInWeiArr)
				const multiSenderAddr = getMultiSenderPrincipal(canistersId)
				let isApproved = true
				if (tokenType === 'dip20') {
					isApproved = await getDip20Approval(tokenPrincipal, multiSenderAddr, totalAmountInWei)
				}
				else if (tokenType === 'dip721') {
					isApproved = await getDip721Approval(tokenPrincipal, multiSenderAddr)
				}
				if (!isApproved) {
					setMessage1(messagesTable.APPROVAL_PROBLEM)
					setBtnText(btnTextTable.SEND)
					return
				}
				setBtnText(btnTextTable.SENDING)
				// console.log({ tokenType, tokenAddress, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr })
				const { isTransferred, hash } = await transferToMultiSender(tokenType, tokenPrincipal, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr)
				if (!isTransferred) {
					setMessage1(messagesTable.TRANSFER_PROBLEM)
					setBtnText(btnTextTable.SEND)
					return
				}
				setTxnHash(hash)
				setBtnText(btnTextTable.SEND)
			} catch (err) {
				console.log(err)
				setMessage1(messagesTable.TRANSFER_PROBLEM)
				setBtnText(btnTextTable.SEND)
			}
		}
	}

	return (
		<ContractComponent>
			<Wrapper>
				<div>
					<Stack 
					mx='auto' 
					spacing={3} 
					minWidth={aboveLarge ? 'auto' : 'auto'}
					color='text.primary'
					>
						<FormControl component="fieldset">
							<FormLabel component="legend" color='primary'>Multi Sender Type: </FormLabel>
							<RadioGroup
								row aria-label="gender"
								name="row-radio-buttons-group"
								value={tokenType}
								onChange={e => setTokenType(e.target.value)}

							>
								<FormControlLabel value="icp" control={<Radio />} label="ICP" />
								<FormControlLabel value="dip20" control={<Radio />} label="DIP20" />
								<FormControlLabel value="dip721" control={<Radio />} label="DIP721" />
							</RadioGroup>
						</FormControl>

						{(tokenType !== 'icp') &&
							<TextField
								fullWidth
								id="standard-basic"
								label="Token Canister ID"
								variant="standard"
								value={tokenPrincipal}
								onChange={e => setTokenPrincipal(e.target.value)}
							/>
						}

						<TextField
							fullWidth
							color='primary'
							id="standard-multiline-static"
							label={(() => {
								if (tokenType === 'icp' || tokenType === 'dip20') {
									return multisenderTable.REC_AMT_TXT
								}
								else if (tokenType === 'dip721') {
									return multisenderTable.REC_ID_TXT
								}
							})()}
							multiline
							rows={4}
							// defaultValue="Default Value"
							variant="standard"
							placeholder={(() => {
								if (tokenType === 'icp' || tokenType === 'dip20') {
									return multisenderTable.REC_AMT_VAL
								}
								else if (tokenType === 'dip721') {
									return multisenderTable.REC_ID_VAL
								}
							})()}
							value={recipientData}
							onChange={e => setRecipientData(e.target.value)}
						/>

						<Button onClick={handleTokenTransfer}
							disabled={(
								btnText === btnTextTable.APPROVING
								|| btnText === btnTextTable.SENDING
							)}
							variant="contained" endIcon={<SendIcon />}>
							{btnText}
						</Button>
						{
							(btnText === btnTextTable.APPROVING || btnText === btnTextTable.SENDING) &&
							<LinearProgress />
						}

						{
							(txnHash.length > 0) &&
							<a style={{ fontSize: '15px', textAlign: 'center', fontWeight: 'bold' }}
								href={`${"https://ic.rocks/"}txs/${txnHash}`}
							>
								Transaction Successful - View on IC rock

							</a>
						}
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
	border-radius: 25px;
	max-width: auto;
	font-size: 1.5rem;
	background: #ffffff;
	box-shadow: 2px 8px 10px 4px rgba(0, 0, 0, 0.3);
	
	  
`;
export default MultiSender;