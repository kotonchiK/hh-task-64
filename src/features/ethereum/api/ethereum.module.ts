import { Module } from "@nestjs/common";
import {EthereumController} from "./ethereum.controller";
import {EthereumService} from "../application/ethereum.service";


@Module({
  controllers:[EthereumController],
  providers:[EthereumService],
})
export class EthereumModule {}