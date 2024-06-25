import {Controller, Get, Param} from '@nestjs/common';
import {BlockOutputModel} from "./models/block.output";
import {EthereumService} from "../application/ethereum.service";
import {ValidateBlockHeightPipe} from "../../../infrastructure/pipes/block-height.pipe";
import {ValidateHexValuePipe} from "../../../infrastructure/pipes/transaction-hash.pipe";
import {TransactionOutput} from "./models/transaction.output";

@Controller('ethereum')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Get('block/:height')
  async getBlock(@Param('height', ValidateBlockHeightPipe) height:string):Promise<BlockOutputModel> {
    return this.ethereumService.getBlockById(height);
  }

  @Get('transactions/:hash')
  async getTransaction(@Param('hash', ValidateHexValuePipe) hash:string):Promise<TransactionOutput> {
    return this.ethereumService.getTransactionById(hash);
  }
}

