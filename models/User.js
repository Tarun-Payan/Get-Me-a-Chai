import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String},
    username: {type: String, required: true},
    profilepic: {type: String},
    coverpic: {type: String},
    razorpayId: {type: String},
    razorpaySecret: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

export default mongoose.models.User || model("User", UserSchema);