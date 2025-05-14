import mongoose, { Schema, Document } from 'mongoose';

// Wallet interface
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

// Wallet schema
const WalletSchema: Schema = new Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    encryptedPrivateKey: {
      type: String,
    },
    balance: {
      eth: {
        type: Number,
        default: 0,
      },
      tokens: [
        {
          address: String,
          symbol: String,
          balance: Number,
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export Wallet model
export default mongoose.model<IWallet>('Wallet', WalletSchema);
