import { STATUS_CODES } from '../../constants/status-codes';
import userDatabase from '../../repositories/user-database';

export const getUsers = () => {
    return {
        statusCode: STATUS_CODES.SUCCESS,
        message: userDatabase.getUsers(),
    };
};
