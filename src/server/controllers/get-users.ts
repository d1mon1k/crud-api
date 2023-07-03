import userDatabase from '../../repositories/userDatabase';
import { STATUS_CODES } from '../../constants/status-codes';

export const getUsers = () => {
    return {
        statusCode: STATUS_CODES.SUCCESS,
        message: userDatabase.getUsers(),
    };
};
