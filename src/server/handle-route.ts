import { USERS_ROUTES } from '../constants/routes';
import { getUsers } from './controllers/get-users';
import { STATUS_CODES } from '../constants/status-codes';
import { HTTP_METHODS } from '../constants/http-methods';
import { mapUrls } from '../utils/map-urls';
import { createUser } from './controllers/create-user';
import { TUser } from '../types';
import { getUserById } from './controllers/get-user-by-id';
import { getUrlPayload } from '../utils/get-url-payload';
import { updateUser } from './controllers/update-user';

type THandleRouteOutput = {
    statusCode: STATUS_CODES;
    message: unknown;
};

type TRequestData = {
    data: string;
    url: string;
    method: string;
};

export const handleRoute = async (requestData: TRequestData): Promise<THandleRouteOutput> => {
    const { url, method } = requestData;
    const data = JSON.parse(requestData.data || '{}');

    if (method === HTTP_METHODS.GET && mapUrls(USERS_ROUTES.GET_USERS, url)) {
        return getUsers();
    }

    if (method === HTTP_METHODS.GET && mapUrls(USERS_ROUTES.GET_USER, url)) {
        return getUserById(getUrlPayload(USERS_ROUTES.GET_USER, url));
    }

    if (method === HTTP_METHODS.POST && mapUrls(USERS_ROUTES.ADD_USER, url)) {
        return await createUser(data as Omit<TUser, 'id'>);
    }

    if (method === HTTP_METHODS.PUT && mapUrls(USERS_ROUTES.UPDATE_USER, url)) {
        return updateUser(getUrlPayload(USERS_ROUTES.UPDATE_USER, url), data);
    }

    // prettier-ignore
    if (method === HTTP_METHODS.DELETE && mapUrls(USERS_ROUTES.DELETE_USER, url)) {
        return getUsers();
    }

    return getUsers();
};
