import {BlockOutputModel} from "../../features/ethereum/api/models/block.output";

export const blockMapper = (block:any):BlockOutputModel => {
    return {
        height: parseInt(block.number, 16),
        hash: block.hash,
        parentHash: block.parentHash,
        gasLimit: parseInt(block.gasLimit, 16),
        gasUsed: parseInt(block.gasUsed, 16),
        size: parseInt(block.size, 16)
    };
}