class Database {
    private readonly database: { [key: string]: any };

    constructor() {
        this.database = {};
    }

    getEntry(key: string): any {
        return this.database[key];
    }

    setEntry(key: string, value: any): void {
        this.database[key] = value;
    }
}

const database = new Database();
export default database;
