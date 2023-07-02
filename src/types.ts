export type TUser = {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
};

export type TDatabase = { [userId: string]: TUser };
