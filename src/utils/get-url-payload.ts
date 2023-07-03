import { USERS_ROUTES } from '../constants/routes';

type TGetUrlPayloadOutput = string | undefined;

export const getUrlPayload = (urlSample: USERS_ROUTES, url: string): TGetUrlPayloadOutput => {
    const splitUrlSample = urlSample.split('/');
    const splitUrl = url.split('/');
    const varIndex = splitUrlSample.findIndex((e) => e.startsWith(':'));

    return splitUrl[varIndex];
};

getUrlPayload(USERS_ROUTES.GET_USER, 'api/users/2153809d-69cc-4f4c-bf34-24e0922e309f');
