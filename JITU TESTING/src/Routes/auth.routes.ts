import { Router } from "express";
import { deleteUser, getAllUsers, getUser, registerUser, updateUser } from "../Controllers/auth.controllers";


const auth= Router();

auth.post("/register", registerUser)
auth.get("/getUser/:User_id", getUser)
auth.get("/allUsers", getAllUsers)
auth.delete("/delete/:User_id", deleteUser)
auth.post("/update/:User_id", updateUser)

export default auth;