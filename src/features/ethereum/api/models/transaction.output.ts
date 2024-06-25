export interface TransactionOutput {
    hash: string;
    to: string;
    from: string;
    value: string;
    input: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas:number
    gasPrice:string
}