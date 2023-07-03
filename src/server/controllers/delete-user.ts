import { validate } from 'uuid';
import userDatabase from '../../repositories/user-database';
import { STATUS_CODES } from '../../constants/status-codes';

const messageMap = new Map([
    [STATUS_CODES.NOT_FOUND, 'The requested user was not found'],
    [STATUS_CODES.BAD_REQUEST, 'The invalid userId has been provided'],
    [STATUS_CODES.NO_CONTENT, 'The requested user was deleted'],
]);

export const deleteUser = async (id: string | undefined) => {
    if (id && validate(id)) {
        const user = userDatabase.getUser(id);

        if (!user) {
            return {
                statusCode: STATUS_CODES.NOT_FOUND,
                message: messageMap.get(STATUS_CODES.NOT_FOUND),
            };
        }

        await userDatabase.deleteUser(id);

        return {
            statusCode: STATUS_CODES.NO_CONTENT,
            message: messageMap.get(STATUS_CODES.NO_CONTENT),
        };
    } else {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: messageMap.get(STATUS_CODES.BAD_REQUEST),
        };
    }
};
