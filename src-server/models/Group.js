import mongoose from 'mongoose';

const PcSchema = new mongoose.Schema({
    name: { type: String, required: true},
    namespc: [{ type: String, required: true}]
})

export const Group = mongoose.model("Group", PcSchema);