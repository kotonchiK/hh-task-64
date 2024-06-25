import {Injectable, NotFoundException} from '@nestjs/common';
import axios from 'axios';
import {blockMapper} from "../../../infrastructure/mappers/block.mapper";
import {BlockOutputModel} from "../api/models/block.output";
import {transactionMapper} from "../../../infrastructure/mappers/transaction.mapper";
import {TransactionOutput} from "../api/models/transaction.output";

@Injectable()
export class EthereumService {
    async getBlockById(height:string):Promise<BlockOutputModel>{
        const block = await this.getBlock(height)

        if (!block) throw new NotFoundException(`Block with height ${height} not found`);

        return blockMapper(block)

    }
    async getBlock(height:string): Promise<any> {
        try {
            const response = await axios.post(
                'https://ethereum.publicnode.com/',
                {
                    "jsonrpc": "2.0",
                    "method": "eth_getBlockByNumber",
                    "params": [height, false],
                    "id": 1
                },
            );
            return response.data.result;
        } catch (error) {
            throw new Error(`Failed to fetch block ${height}: ${error.message}`);
        }
    }

    async getTransactionById(hash:string):Promise<TransactionOutput>{
        const transaction = await this.getTransaction(hash)

        if (!transaction) throw new NotFoundException(`Transaction with hash ${hash} not found`);

        return transactionMapper(transaction)

    }
    async getTransaction(hash: string):Promise<any> {
        try {
            const response = await axios.post(
                'https://ethereum.publicnode.com/',
                {
                    jsonrpc: '2.0',
                    method: 'eth_getTransactionByHash',
                    params: [hash],
                    id: 1,
                },
            );
            return response.data.result;
        } catch (error) {
            throw new Error(`Failed to fetch transaction ${hash}: ${error.message}`);
        }
    }
}
