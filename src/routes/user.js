import { Router } from "express";
import { createUser, updateUser, deleteUser, listUser, foundUser, login} from "../controllers/user.js";

const user = Router()

user.post("/create/user", createUser)
user.put("/update/user", updateUser)
user.delete("/delete/user", deleteUser)
user.get("/list/users", listUser)
user.post("/find/user", foundUser)
user.post("/login/user", login)


export default user