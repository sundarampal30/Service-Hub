import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    service: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Request = mongoose.model("Request", RequestSchema);
export default Request;