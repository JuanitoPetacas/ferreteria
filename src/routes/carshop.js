import { createCarshop, deleteCarshop, carshopList, obtainCarshop, deleteObjectsCarshop, updatedCarshop  } from "../controllers/carshop.js";
import { Router } from "express";

const Carshop = Router()

Carshop.delete("/deleteDetail/Carshop", deleteObjectsCarshop)
Carshop.post("/list/Carshop", carshopList)
Carshop.post("/create/Carshop", createCarshop)
Carshop.delete("/delete/Carshop", deleteCarshop)
Carshop.post("/obtain/Carshop", obtainCarshop)
Carshop.put("/update/Carshop", updatedCarshop)


export default Carshop;