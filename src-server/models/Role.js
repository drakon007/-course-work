import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    value: { type: String, required: true, default: "USER", unique: true }
});

export const Role = mongoose.model('Role', RoleSchema);