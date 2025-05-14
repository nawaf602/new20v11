import mongoose, { Document } from 'mongoose';
export interface IWallet extends Document {
    address: string;
    name: string;
    userId: string;
    encryptedPrivateKey?: string;
    balance: {
        eth: number;
        tokens: {
            address: string;
            symbol: string;
            balance: number;
        }[];
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IWallet, {}, {}, {}, mongoose.Document<unknown, {}, IWallet, {}> & IWallet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
