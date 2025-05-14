import mongoose, { Schema, Document } from "mongoose"; // Removed HookNextFunction import
import bcrypt from "bcrypt";

// User interface
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

// User schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
    },
    wallets: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
// Removed explicit type for next, letting TypeScript infer or using default
UserSchema.pre<IUser>("save", async function (next) { // Removed : HookNextFunction
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: unknown) {
    // Pass error to the next middleware
    if (error instanceof Error) {
        next(error);
    } else {
        // Handle cases where the caught object is not an Error instance
        next(new Error("An unknown error occurred during password hashing"));
    }
  }
});

// Compare password method
// Ensure 'this' is correctly typed within the method
UserSchema.methods.comparePassword = async function (
  this: IUser, // Explicitly type 'this'
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export User model
export default mongoose.model<IUser>("User", UserSchema);

