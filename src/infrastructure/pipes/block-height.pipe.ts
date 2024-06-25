import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {BlockHeightDto} from "../../features/ethereum/api/models/block.input";

@Injectable()
export class ValidateBlockHeightPipe implements PipeTransform {
    async transform(value:string):Promise<string> {
        const dto = plainToClass(BlockHeightDto, { height: Number(value) });

        const errors = await validate(dto);

        if (errors.length > 0) {
            const errorMessage = errors[0].constraints ? Object.values(errors[0].constraints)[0] : 'Validation failed';
            throw new BadRequestException(errorMessage);
        }
        return '0x' + parseInt(value.toString(), 10).toString(16)
    }
}

