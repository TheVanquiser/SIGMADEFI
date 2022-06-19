import BigNumber from "bignumber.js"
const BN = require('bn.js');
export const plug = (window as any).ic?.plug;

export const messagesTable = {
	NOT_SUPPORTED: 'Current Network is not supported.',
	NOT_INSTALLED: 'Metamask is not Installed',
	METAMASK_LOCKED: 'Wallet is not connected',
	TRANSFER_PROBLEM: 'Problem occurred while transferring tokens',
	INVALID_DATA: 'Invalid data provided',
	APPROVAL_PROBLEM: 'Problem occurred while approval',
	LOCK_PROBLEM: 'Problem occurred while locking tokens',
	FAUCET_PROBLEM: 'Error occurred while sending tokens',
	INVALID_TOKENADDRESS: 'Invalid Token Address'
}

export const btnTextTable = {
	SEND: 'Send',
	APPROVING: 'Approving...',
	SENDING: 'Sending...',
}

export const multisenderTable = {
	REC_AMT_TXT: 'Recipient,Amount',
	REC_AMT_VAL: `a3edfbb18efe7dc39266fbe8061e5d65b9cf988e395e1c429ab2cf834835b96a,1000
	a3edfbb18efe7dc39266fbe8061e5d65b9cf988e395e1c429ab2cf834835b96a,0.001`,
	REC_ID_TXT: 'Recipient,TokenId',
	REC_ID_VAL: `a3edfbb18efe7dc39266fbe8061e5d65b9cf988e395e1c429ab2cf834835b96a,5
	a3edfbb18efe7dc39266fbe8061e5d65b9cf988e395e1c429ab2cf834835b96a,8`,
	REC_ID_AMT_TXT: 'Recipient,TokenId,Amount',
	REC_ID_AMT_VAL: `a3edfbb18efe7dc39266fbe8061e5d65b9cf988e395e1c429ab2cf834835b96a,7,8
	a3edfbb18efe7dc39266fbe8061e5d65b9cf988e395e1c429ab2cf834835b96a,3,12`
}

export const processRecipientData = async (recipientData: string, tokenType: string, decimals: number) => {
	const recipientsArr: string[] = []
	const tokenIdsArr: BigNumber[] = []
	const tokenAmountsInWeiArr: BigNumber[] = []
	try {
		const recipientDataArr = recipientData.trim().split('\n')

		if (tokenType === 'dip20' || tokenType === 'icp') {
			for (let i = 0; i < recipientDataArr.length; i++) {
				const [currRecipient, currAmount] = recipientDataArr[i].trim().split(',')
				recipientsArr.push(currRecipient)
				tokenAmountsInWeiArr.push(plug.utils.parseUnits(currAmount, decimals))
			}
			return { done: true, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }
		}
		else if (tokenType === 'dip721') {
			for (let i = 0; i < recipientDataArr.length; i++) {
				const [currRecipient, currId] = recipientDataArr[i].trim().split(',')
				recipientsArr.push(currRecipient)
				tokenIdsArr.push(BN(currId))
			}
			return { done: true, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }
		}
	} catch (err) {
		console.log({ err })
		return { done: false, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }
	}
	const done = Boolean(recipientsArr.length)
	return { done, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }

}