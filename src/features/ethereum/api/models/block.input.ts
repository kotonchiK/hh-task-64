import { IsInt, Min } from 'class-validator';

export class BlockHeightDto {
    @IsInt({ message: 'Block height must be an integer' })
    @Min(0, { message: 'Block height must be a positive integer' })
    readonly height: number;
}
