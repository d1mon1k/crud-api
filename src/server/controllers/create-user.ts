import { TUser } from '../../types';
import { STATUS_CODES } from '../../constants/status-codes';
import userDatabase from '../../repositories/user-database';
import { assertModel } from '../../utils/assert-model';
import { userModel } from '../models/user-model';
import { v4 } from 'uuid';

// prettier-ignore
const messageMap = new Map([
    [STATUS_CODES.BAD_REQUEST, 'The request body does not contain the required fields or' +
            ' contains fields with incorrect data types'],
]);

export const createUser = async (userData: Omit<TUser, 'id'>) => {
    if (assertModel(userModel, userData)) {
        const preparedUser = {
            id: v4(),
            username: userData.username,
            age: userData.age,
            hobbies: userData.hobbies,
        };

        await userDatabase.setUser(preparedUser);

        return {
            statusCode: STATUS_CODES.SUCCESSFUL_CREATION,
            message: preparedUser,
        };
    }

    return {
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: messageMap.get(STATUS_CODES.BAD_REQUEST),
    };
};
