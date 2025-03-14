import mongoose from "mongoose";
import { ItemPurchased } from "../models/itemPurchasedModel.js";
import moment from "moment";

export async function getProductsSoldToday(request, response) {
    try {
        // Get the current date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

        // Get items purchased today
        const itemsPurchasedToday = await ItemPurchased.find({
            createdAt: { $gte: today },
        });

        // Calculate total sale for today
        const totalSaleToday = itemsPurchasedToday.reduce(
            (acc, item) => acc + item.quantity * item.unitPrice,
            0
        );

        // Get items purchased yesterday
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const itemsPurchasedYesterday = await ItemPurchased.find({
            createdAt: { $gte: yesterday, $lt: today },
        });

        // Calculate total sale for yesterday
        const totalSaleYesterday = itemsPurchasedYesterday.reduce(
            (acc, item) => acc + item.quantity * item.unitPrice,
            0
        );

        // Calculate the percentage change
        const percentageChange = calculatePercentageChange(totalSaleYesterday, totalSaleToday);

        response.status(200).json({ totalSaleToday, totalSaleYesterday, percentageChange });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "An error occurred while fetching total sale." });
    }
}

function calculatePercentageChange(previousValue, currentValue) {
    if (previousValue === 0) {
        return currentValue > 0 ? 100 : 0;
    }

    return ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
}
/*
export async function getAllSalesToday(request, response) {
    try {
        // Get the current date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

        // Get items purchased today
        const itemsPurchasedToday = await ItemPurchased.find({
            createdAt: { $gte: today },
        });

        // Calculate total sale
        const totalSale = itemsPurchasedToday.reduce(
            (acc, item) => acc + item.quantity * item.unitPrice,
            0
        );

        res.status(200).json({ totalSale });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred while fetching total sale." });
    }
}*/
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

export const getTotalProductQuantities = async () => {
        try {
            // Get the current date
            const today = moment().startOf('day');
    
            // Use Mongoose aggregation to sum the total quantities
            const result = await ItemPurchased.aggregate([
                {
                    $match: {
                        createdAt: { $gte: today.toDate() },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalQuantity: { $sum: "$quantity" },
                    },
                },
            ]);
    
            return result.length > 0 ? result[0].totalQuantity : 0;
        } catch (error) {
            console.error("Error fetching total product sold:", error);
            throw error;
        }
    };
   