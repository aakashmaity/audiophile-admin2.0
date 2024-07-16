import mongoose, { model, models, Schema } from "mongoose";

const AdminScheme = new Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
        
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
    verifyToken: String,
    verifyExpires: Date,
})

const Admin = models?.Admin || model("Admin", AdminScheme);

export default Admin;
