import Request from "../model/requestmodel.js";
export const getMyBookings = async (req, res) => {
    try {
        console.log("USER ID:", req.userId); // 🔥 check

        const myBookings = await Request.find({
            userId: req.userId,
        }).populate("userId", "name address") // 🔥 check if provider details are coming
            .populate("providerId", "name fee")
            .sort({ createdAt: -1, _id: -1 }); // latest first


        console.log("DATA:", myBookings); // 🔥 check

        res.status(200).json({ bookings: myBookings });

    } catch (error) {
        console.log("FULL ERROR:", error); // 🔥 main cheez
        res.status(500).json({ message: "Error fetching bookings" });
    }
};