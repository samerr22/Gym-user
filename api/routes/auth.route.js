import express from "express";
import { Feedcreate, deletefeed, getfeed, signgin, signup, updatefedd } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/VerfiyUser.js";


const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post("/Fcreate", Feedcreate);
route.get('/gefeed/:CurrentuseId', getfeed);
route.put('/updatefeed/:FeedId',verifyToken, updatefedd);
route.delete('/deletefeed/:FeeddId',verifyToken,  deletefeed);

export default route;
