import {BadRequestException, ValidationPipe} from "@nestjs/common";
interface ErrorMessage {
    message: string;
    field: string;
}

const validationPipeConfig = {
    stopAtFirstError: false,
    exceptionFactory: (errors) => {
        const errorsForResponse = [];
        errors.forEach((e) => {
            const constraintsKeys = Object.keys(e.constraints);
            constraintsKeys.forEach((ckey) => {
                errorsForResponse.push({
                    message: e.constraints[ckey],
                    field: e.property
                });
            });
        });
        throw new BadRequestException(removeDuplicateFields(errorsForResponse));
    }
};
export const globalValidationPipe = new ValidationPipe(validationPipeConfig);

function removeDuplicateFields(errors: ErrorMessage[]): ErrorMessage[] {
    const errorMap = new Map<any, ErrorMessage>();

    for (const error of errors) {
        errorMap.set(error.field, error);
    }

    return Array.from(errorMap.values());
}
