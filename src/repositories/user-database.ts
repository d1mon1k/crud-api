import { TDatabase, TUser } from '../types';
import { recordDatabase } from '../utils/record-database';
import jsonDatabase from '../database/database.json';

class UserDatabase {
    private readonly database: TDatabase;

    constructor() {
        this.database = jsonDatabase;
    }

    public getUser(id: string): TUser | undefined {
        return this.database[id];
    }

    public getUsers(): TDatabase {
        return this.database;
    }

    public async setUser(user: TUser): Promise<void> {
        try {
            this.database[user.id] = user;

            await recordDatabase(this.database);
        } catch {}
    }
}

const userDatabase = new UserDatabase();
export default userDatabase;
