import { createCategory, deleteCategory, foundCategory, listCategories } from '../controllers/categories.js'
import { Router } from "express";


const Categories = Router()

Categories.get("/list/Categories", listCategories)
Categories.post("/create/Categories", createCategory)
Categories.delete("/delete/Categories", deleteCategory)
Categories.post("/found/Categories", foundCategory)


export default Categories;