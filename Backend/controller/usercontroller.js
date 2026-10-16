import User from "../model/usermodel.js";

export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error (usercontroller)" });
    }
}
export const editProfile = async (req, res) => {
    try {
        const { name, email, Phone, address, city, state, country, pincode } = req.body;

        let updateData = {
            name, email, Phone,
            address: {
                full: address,
                city,
                state,
                country,
                pincode
            }
        };


        if (req.file) {
            updateData.avatar = req.file.filename;
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            updateData,
            { new: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile updated",
            user,
        });

    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
};



