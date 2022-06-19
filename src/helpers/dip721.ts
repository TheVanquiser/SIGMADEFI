import { Principal } from '@dfinity/principal';

const dip721Abi = [
	'function name() public view returns (string memory)',
	'function symbol() public view returns (string memory)',
	'function isApprovedForAll(principal owner, address operator) external view returns (bool)',
	'function setApprovalForAll(principal operator, bool _approved) external'
]
export const plug = (window as any).ic?.plug;
declare global {
	interface Window {
		canisters?: Principal[]
		timeout?: number
	}
}
export const getDip721Canisters = (tokenPrincipal: string) => {
	return new plug.Canisters(tokenPrincipal, dip721Abi)
}

export const getDip721Approval = async (tokenPrincipal: string, operator: string) => {
	try {
		const currUser = await plug.getPrincipal();
		const dip721Canisters = getDip721Canisters(tokenPrincipal)
		const isAlreadyApproved = await dip721Canisters.isApprovedForAll(currUser, operator)
		if (isAlreadyApproved) return true
		const txn = await dip721Canisters.setApprovalForAll(operator, true)
		await txn.wait(1)
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}