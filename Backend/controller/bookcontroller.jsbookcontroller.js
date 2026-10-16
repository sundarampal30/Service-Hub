import Request from "../model/requestmodel.js";
import User from "../model/usermodel.js";


export const bookProvider = async (req, res) => {
    try {
        const { providerId, service, date, address } = req.body;
        const provider = await User.findById(providerId);
        const newRequest = await Request.create({
            userId: req.userId,
            providerId,
            service,
            date,
            address,
            fee: provider.fee,
            status: "pending"
        });
        console.log("BOOKING SAVED USER:", req.userId);

        res.status(201).json({
            message: "Request submitted",
            request: newRequest
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Booking failed" });
    }
};
export const getProviderHistory = async (req, res) => {
    try {
        const requests = await Request.find({
            providerId: req.userId,

        }).populate("userId", "name address")
            .populate("providerId", "name fee")
            .sort({ createdAt: -1, _id: -1 });

        res.status(200).json({ requests });

    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Error fetching requests" });
    }
};




export const updateRequestStatus = async (req, res) => {
    try {
        const { requestId, status } = req.body;

        const request = await Request.findByIdAndUpdate(
            requestId,
            { status },
            { new: true }
        );

        res.status(200).json({
            message: "Status updated",
            request,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update failed" });
    }
};