import { model } from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
        default: 'Patient',
    },
    phone:{
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export default model('User', userSchema);
