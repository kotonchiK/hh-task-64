import {TransactionOutput} from "../../features/ethereum/api/models/transaction.output";

export const transactionMapper = (transaction:any):TransactionOutput => {
    return {
        hash: transaction.hash,
        to:transaction.to,
        from: transaction.from,
        value: convertToEth(transaction.value),
        input:transaction.input,
        maxFeePerGas: convertToGwei(transaction.maxFeePerGas),
        maxPriorityFeePerGas:parseInt(transaction.maxPriorityFeePerGas, 16),
        gasPrice:convertToEth(transaction.gasPrice)
    };
}

function convertToEth(weiAmount:string):string {
    return (
        parseInt(weiAmount, 16)
        / 10**18)
        .toFixed(18)
        .replace(/\.?0+$/, '')
        + ' ETH'
}

function convertToGwei(weiAmount:string):string {
    return (
        parseInt(weiAmount, 16)
        / 10**9)
        .toLocaleString('en-US', {
        minimumFractionDigits: 9,
        maximumFractionDigits: 9
    }) + ' Gwei'
}