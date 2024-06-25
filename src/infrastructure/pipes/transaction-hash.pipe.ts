import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
@Injectable()
export class ValidateHexValuePipe implements PipeTransform {
    transform(value:string):string {
        if (!value.toString().startsWith('0x') || isNaN(parseInt(value.toString().slice(2), 16))) {
            throw new BadRequestException('Invalid hex value format');
        }
        return value;
    }
}