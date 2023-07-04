import { TModels } from '../server/models/types';

export const assertModel = (model: TModels, entity: { [key: string]: any }): boolean => {
    for (const key in model) {
        const modelValue = model[key];
        const entityValue = entity[key];

        if (modelValue !== typeof entityValue) {
            if (modelValue === 'array' && Array.isArray(entityValue)) {
                continue;
            }

            return false;
        }
    }

    return true;
};
