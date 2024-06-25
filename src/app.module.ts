import { Module } from '@nestjs/common';
import {EthereumModule} from "./features/ethereum/api/ethereum.module";

@Module({
  imports: [
    EthereumModule,
  ],
})
export class AppModule {}
