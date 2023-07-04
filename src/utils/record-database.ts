import fs from 'fs/promises';
import path from 'path';
import { __root } from '../constants/root-path';
import { TDatabase } from '../types';

export const recordDatabase = async (database: TDatabase) => {
    await fs.writeFile(
        path.join(__root, 'src/database/database.json'),
        JSON.stringify(database)
    );
};
