import { Router, Request, Response } from "express";
import UserController from "../controller/userController";
import { authMiddleware } from '../middleware/authMiddleware';
const v1Router = Router();
const userController = new UserController();
v1Router.post("/user", (req : Request, res : Response)=>{
    const userController = new UserController();
    return userController.createUser(req, res);
})
v1Router.get("/user",(req : Request, res : Response)=>{
    const userController = new UserController();
    return userController.getUser(req, res);
})  
v1Router.post("/auth", (req:Request, res:Response)=>{
    const userController = new UserController()
    return userController.login(req,res)
});
export default v1Router;