import multer from "multer";

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder
    },

    filename: (req, file, cb) => {

        const cleanName = file.originalname
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9._-]/g, "");
        cb(null, Date.now() + "-" + cleanName);
    },
});


const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
});