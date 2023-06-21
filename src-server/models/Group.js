import mongoose from 'mongoose';

const PcGroup = new mongoose.Schema({
    name: { type: String, required: true},
    namespc: [{ type: String, required: true}]
})

export const Group = mongoose.model("Group", PcGroup);