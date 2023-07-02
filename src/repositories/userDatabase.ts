import { TDatabase, TUser } from '../types';
import { createRequire } from 'module';
import { __root } from '../constants/root-path';
import { recordDatabase } from '../utils/record-database';

const require = createRequire(import.meta.url);

class UserDatabase {
    private readonly database: TDatabase;

    constructor() {
        this.database = JSON.parse(
            require(`${__root}/src/database/database.json}`)
        );
    }

    public getUser(id: string): TUser | undefined {
        return this.database[id];
    }

    public async setUser(user: TUser): Promise<void> {
        this.database[user.id] = user;

        await recordDatabase(this.database);
    }
}

const userDatabase = new UserDatabase();
export default userDatabase;
