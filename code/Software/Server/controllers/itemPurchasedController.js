import mongoose from "mongoose";
import { ItemPurchased } from "../models/itemPurchasedModel.js";

export async function getAllItemsPurchased(request, response) {
    try {
        const itemPurchased = await ItemPurchased.find();

        if (itemPurchased.length > 0) {
            return response.status(200).json({
                count: itemPurchased.length,
                data: itemPurchased,
            });
        } else {
            return response
                .status(404)
                .json({ message: "No purchased items found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({
                error: "An error occurred while fetching purchased items.",
            });
    }
}

export async function getItemsPurchasedById(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid purchased item id`,
            });
        }

        const itemsPurchased = await ItemPurchased.findById(id).exec();

        if (itemsPurchased) {
            return response.status(200).json(itemsPurchased);
        } else {
            return response
                .status(404)
                .json({ message: "Purchased item not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({
                error: "An error occurred while fetching purchased items.",
            });
    }
}

export async function saveNewItemsPurchased(request, response) {
    try {
        if (
            !request.body.billID ||
            !request.body.productID ||
            !request.body.quantity ||
            !request.body.unitPrice
        ) {
            return response.status(400).send({
                message: `Send all required fields: Bill id, Product id, quantity, unit price`,
            });
        }

        // TODO: Check whether there's enough quantity in database

        const newItemsPurchased = {
            billID: request.body.billID,
            productID: request.body.productID,
            quantity: request.body.quantity,
            unitPrice: request.body.unitPrice
        };

        const itemPurchased = await ItemPurchased.create(newItemsPurchased);
        return response.status(201).send(itemPurchased);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export async function updateItemsPurchased(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid purchased item id`,
            });
        }

        // TODO: Check whether there's enough quantity in database

        const result = await ItemPurchased.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({
                message: `purchased item not found`,
            });
        }

        return response.status(200).send({
            message: `Purchased item successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export async function deleteItemsPurchasedById(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid purchased item id`,
            });
        }

        const result = await ItemPurchased.findByIdAndDelete(id);

        if (result) {
            return response.status(404).json({
                message: `purchased item successfully deleted!`,
            });
        } else {
            return response.status(404).json({ message: "purchased item not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching purchased items." });
    }
}
