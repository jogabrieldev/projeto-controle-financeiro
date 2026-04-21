import { Router, Request, Response } from "express";
import UserController from "../controller/userController";
import { authMiddleware } from '../middleware/authMiddleware';
const v1Router = Router();

v1Router.post("/user", (req : Request, res : Response)=>{
    const userController = new UserController();
    return userController.createUser(req, res);
})

export default v1Router;