import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
    wallets: string[];
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
