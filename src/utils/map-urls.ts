import { USERS_ROUTES } from '../constants/routes';

export const mapUrls = (
    expectedUrl: USERS_ROUTES,
    actualUrl: string
): boolean => {
    const splitUrlOne = expectedUrl.split('/');
    const splitUrlTwo = actualUrl.split('/');

    if (splitUrlOne.length !== splitUrlTwo.length) return false;

    for (let i = 0; i < splitUrlOne.length; i++) {
        const elementA = splitUrlOne[i];
        const elementB = splitUrlTwo[i];
        const isLastLap = i === splitUrlOne.length - 1;

        if (elementA !== elementB) {
            return isLastLap && elementA.includes(':');
        }
    }

    return true;
};

// TODO: Provide description for this function
