import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    value: { type: String, required: true, default: "USER" }
});

export const Role = mongoose.model('Role', RoleSchema);