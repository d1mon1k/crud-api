import userDatabase from '../../repositories/user-database';
import { STATUS_CODES } from '../../constants/status-codes';
import { assertModel } from '../../utils/assert-model';
import { userModel } from '../models/user-model';
import { validate } from 'uuid';
import { TUser } from '../../types';

// prettier-ignore
const messageMap = new Map([
    [STATUS_CODES.NOT_FOUND, 'The requested user was not found'],
    [STATUS_CODES.BAD_REQUEST, 'The invalid userId has been provided or request body contains fields with incorrect data types'],
]);

export const updateUser = async (id: string | undefined, userData: Omit<TUser, 'id'>) => {
    if (id && validate(id)) {
        const user = userDatabase.getUser(id);

        if (!user) {
            return {
                statusCode: STATUS_CODES.NOT_FOUND,
                message: messageMap.get(STATUS_CODES.NOT_FOUND),
            };
        }

        if (assertModel(userModel, userData)) {
            const preparedUser = {
                id: id,
                username: userData.username,
                age: userData.age,
                hobbies: userData.hobbies,
            };

            await userDatabase.setUser(preparedUser);

            return {
                statusCode: STATUS_CODES.SUCCESS,
                message: preparedUser,
            };
        } else {
            return {
                statusCode: STATUS_CODES.BAD_REQUEST,
                message: messageMap.get(STATUS_CODES.BAD_REQUEST),
            };
        }
    } else {
        return {
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: messageMap.get(STATUS_CODES.BAD_REQUEST),
        };
    }
};
