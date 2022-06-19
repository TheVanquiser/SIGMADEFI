import { Principal } from '@dfinity/principal';
import BigNumber from 'bignumber.js';

const MultiSenderAbi = [
	'function transferICP(address[] memory _recipients, uint[] memory _amounts) external payable',
	'function transferDIP20(address _tokenAddress, address[] memory _recipients, uint[] memory _amounts) external',
	'function transferDIP721(address _tokenAddress, address[] memory _recipients, uint[] memory _tokenIds) external',
]
const BN = require('bn.js');

declare global {
	interface Window {
		canisters?: Principal[]
		timeout?: number
	}
}

export const getMultiSenderPrincipal = (canistersID: number) => {
	if (canistersID === 123 ) return '3xwpq-ziaaa-aaaah-qcn4a-cai'
	return '3xwpq-ziaaa-aaaah-qcn4a-cai'

}
export const getMultiSenderCanisterId = (canistersID: number) => {
	const plug = (window as any).ic?.plug;
	const MultiSenderAddr = getMultiSenderPrincipal(canistersID)
	return new plug.Canisters(MultiSenderAddr, MultiSenderAbi, plug.getSigner())
}

export const transferToMultiSender = async (tokenType: string, tokenPrincipal: string, recipientsArr: string[], tokenIdsArr: BigNumber[], amountsInWeiArr: BigNumber[]) => {
	try {
		const plug = (window as any).ic?.plug;
		const canisterId = await plug.getCanisterId()
		const multiSenderCanisterId = getMultiSenderCanisterId(canisterId)
		let txn
		if (tokenType === 'icp') {
			let totalAmountInWei = BN('0')
			for (let i = 0; i < amountsInWeiArr.length; i++) {
				totalAmountInWei = totalAmountInWei.add(amountsInWeiArr[i])
			}
			txn = await multiSenderCanisterId.transferICP(recipientsArr, amountsInWeiArr, { value: totalAmountInWei })
		}
		else if (tokenType === 'dip20') {
			txn = await multiSenderCanisterId.transferDIP20(tokenPrincipal, recipientsArr, amountsInWeiArr)
		}
		else if (tokenType === 'dip721') {
			txn = await multiSenderCanisterId.transferDIP721(tokenPrincipal, recipientsArr, tokenIdsArr)
		}
		else {
			return { isTransferred: false, hash: '' }
		}
		await txn.wait()
		return { isTransferred: true, hash: txn.hash }
	} catch (err) {
		console.log(err)
		return { isTransferred: false, hash: '' }
	}
}