import express from "express";

import {
    getAllItemsPurchased,
    getItemsPurchasedById,
    saveNewItemsPurchased,
    updateItemsPurchased,
    deleteItemsPurchasedById,
} from "../controllers/itemPurchasedController.js";

const router = express.Router();

// Route for get all purchased item
router.get("/", getAllItemsPurchased);

// Route for get purchased item by id
router.get("/:id", getItemsPurchasedById);

// Route for Save a new purchased item
router.post("/", saveNewItemsPurchased);

// Route for update a purchased item
router.put("/:id", updateItemsPurchased);

// Route for delete purchased item by id
router.delete("/:id", deleteItemsPurchasedById);

export default router;