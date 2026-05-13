import { Router, Request, Response } from "express";
import UserController from "../controller/userController";
import ReceivingController from "../controller/receivingController";
import { authMiddleware } from '../middleware/authMiddleware';
const v1Router = Router();

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
v1Router.post("/receber",authMiddleware, (req:Request, res:Response)=>{
  const controllerReceber = new ReceivingController()
  return controllerReceber.registerReceiving(req,res)
})
export default v1Router;