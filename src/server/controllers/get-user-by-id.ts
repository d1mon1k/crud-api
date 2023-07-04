import { STATUS_CODES } from '../../constants/status-codes';
import userDatabase from '../../repositories/user-database';
import { validate } from 'uuid';

// prettier-ignore
const messageMap = new Map([
    [STATUS_CODES.NOT_FOUND, 'The requested user was not found'],
    [STATUS_CODES.BAD_REQUEST, 'The invalid userId has been provided'],
    [STATUS_CODES.BAD_REQUEST, 'The request body does not contain the required fields or' +
            ' contains fields with incorrect data types']
]);

export const getUserById = (id: string | undefined) => {
    if (id && validate(id)) {
        const user = userDatabase.getUser(id);

        if (user) return { statusCode: STATUS_CODES.SUCCESS, message: user };

        if (!user)
            return {
                statusCode: STATUS_CODES.NOT_FOUND,
                message: messageMap.get(STATUS_CODES.NOT_FOUND),
            };
    }

    return {
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: messageMap.get(STATUS_CODES.BAD_REQUEST),
    };
};
