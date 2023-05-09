import mongoose from "mongoose";

const PcSchema = new mongoose.Schema({
    name: { type: String, required: true},
    ip: { type: String},
    lasttime: { type: Date }
});

export const Pc = mongoose.model("Pc", PcSchema);