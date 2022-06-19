import {
	SignIdentity,
	Signature,
} from "@dfinity/agent";
import { Principal } from '@dfinity/principal';
import { BigNumber } from "bignumber.js";

const dip20Abi = [
	'function name() public view returns (string memory)',
	'function symbol() public view returns (string memory)',
	'function decimals() public view returns (uint8)',
	'function allowance(principal owner, address spender) external view returns (uint256)',
	'function approve(principal spender, uint256 amount) external returns (bool)'
]
export const plug = (window as any).ic?.plug;

declare global {
	interface Window {
		Signer: Signature
		sign: SignIdentity
		canisters?: Principal[]
		timeout?: number
	}
}

const BN = require('bn.js');
	
	export const getDip20Canisters = (tokenPrincipal: string) => {
		return new plug.Contract(tokenPrincipal, dip20Abi)
	}

	export const getDip20Decimals = async (tokenPrincipal: string) => {
		try {
			const dip20Canisters = getDip20Canisters(tokenPrincipal)
			const decimals = await dip20Canisters.decimals()
			return decimals
		} catch (err) {
			return -1
		}
	}

	export const getTotalSumOfBignumbers = (array: BigNumber[]) => {
		let totalAmount = new BN('0')
		for (let i = 0; i < array.length; i++) {
			totalAmount = totalAmount.add(array[i])
		}
		return totalAmount
	}


	export const getDip20Approval = async (tokenPrincipal: string, operator: string, amountInWei: BigNumber) => {
		try {
			const currUser = await plug.getPrincipal()
			const dip20Canisters = getDip20Canisters(tokenPrincipal)

			const allowance: BigNumber = await dip20Canisters.allowance(currUser, operator)
			if (allowance.gte(amountInWei)) return true

			const txn = await dip20Canisters.approve(operator, amountInWei)
			await txn.wait(1)
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	}