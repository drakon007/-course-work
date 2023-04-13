import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true, ref: 'Role' }]
});

export let User = mongoose.model('User', userSchema);
