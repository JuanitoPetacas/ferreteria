import { Router } from "express";
import { listProduct, createProduct, updateProduct, disableProduct, enableProduct, file, foundProduct } from "../controllers/product.js";
import multer from "multer";
const ram  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + '-' + file.originalname);
    }
})

const uploads =  multer({storage: ram})
const product = Router()

product.get("/list/products", listProduct);
product.post("/found/product", foundProduct);
product.post("/create/product", uploads.single("image_url"), createProduct)
product.put("/update/product", uploads.single("image_url"), updateProduct)
product.post("/disable/product", disableProduct)
product.post("/enable/product", enableProduct)
product.post("/getImg/product", file)

export default product