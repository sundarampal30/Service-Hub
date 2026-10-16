import jwt from "jsonwebtoken";


const isAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        let verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifytoken) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        req.userId = verifytoken.id;
        console.log('user', req.userId);

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Invalid token or expired" });
    }
}
export default isAuth;