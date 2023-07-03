import { USERS_ROUTES } from '../constants/routes';
import { getUsers } from './controllers/get-users';
import { STATUS_CODES } from '../constants/status-codes';

type THandleRouteOutput = {
    statusCode: STATUS_CODES;
    message: unknown;
};

export const handleRoute = (
    route: string | undefined,
    data: string
): THandleRouteOutput => {
    switch (route) {
        case USERS_ROUTES.GET_USERS:
            return getUsers();

        case USERS_ROUTES.ADD_USER:
            return getUsers();

        case USERS_ROUTES.DELETE_USER:
            return getUsers();

        case USERS_ROUTES.GET_USER_BY_ID:
            return getUsers();

        case USERS_ROUTES.UPDATE_USER_BY_ID:
            return getUsers();

        default:
            return getUsers();
    }
};
