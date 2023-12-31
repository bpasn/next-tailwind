import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUsers>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, requried: true, default: false }
    }, {
    timestamps: true
}
);

const UserModel = mongoose.models.User || mongoose.model<IUsers>("User", userSchema);

export default UserModel