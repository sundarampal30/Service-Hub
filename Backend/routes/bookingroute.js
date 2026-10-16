// bookingroutes.js
import express from 'express';
import { bookProvider, updateRequestStatus, getProviderHistory } from "../controller/bookcontroller.js";
import isAuth from "../middleware/isAuth.js";
import { getMyBookings } from '../controller/mybooking.js';
const bookingRouter = express.Router();

bookingRouter.post("/create", isAuth, bookProvider);
bookingRouter.post("/update-status", isAuth, updateRequestStatus);
bookingRouter.get("/history", isAuth, getProviderHistory);
bookingRouter.get("/my-bookings", isAuth, getMyBookings);
export default bookingRouter;