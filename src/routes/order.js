import { createOrder, deleteOrder, orderList, obtainOrder, foundDetailOrder, getOrders  } from "../controllers/order.js";
import { Router } from "express";

const Order = Router()

Order.post("/found/detailOrder", foundDetailOrder)
Order.get("/list/Order", orderList)
Order.post("/create/Order", createOrder)
Order.delete("/delete/Order", deleteOrder)
Order.post("/obtain/Order", obtainOrder)
Order.post("/get/Order", getOrders)

export default Order;