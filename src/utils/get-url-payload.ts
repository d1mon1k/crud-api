import { USERS_ROUTES } from '../constants/routes';

type TGetUrlPayloadOutput = string | undefined;

export const getUrlPayload = (urlSample: USERS_ROUTES, url: string): TGetUrlPayloadOutput => {
    const splitUrlSample = urlSample.split('/');
    const splitUrl = url.split('/');
    const varIndex = splitUrlSample.findIndex((e) => e.startsWith(':'));

    return splitUrl[varIndex];
};
