import validator from 'validator';
import User from '../model/usermodel.js';
import generateToken from '../config/token.js';
import bcrypt from 'bcryptjs';



export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const token = generateToken(user._id);
        if (!token) {
            return res.status(500).json({ message: "Token generation failed" });
        }
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,        // 🔥 always true (Vercel + Render = HTTPS)
            sameSite: "none",    // 🔥 cross-origin ke liye must
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });


    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user._id);
        if (!token) {
            return res.status(500).json({ message: "Token generation failed" });
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,        // 🔥 always true (Vercel + Render = HTTPS)
            sameSite: "none",    // 🔥 cross-origin ke liye must
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};