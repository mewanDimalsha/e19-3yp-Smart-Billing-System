import mongoose from "mongoose";
import { Bill } from "../models/billModel.js";
import { ItemPurchased } from "../models/itemPurchasedModel.js";

export async function getAllBills(request, response) {
    try {
        const bills = await Bill.find();

        if (bills.length > 0) {
            return response.status(200).json({
                count: bills.length,
                data: bills,
            });
        } else {
            return response.status(404).json({ message: "No bills found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching bills." });
    }
}

export async function getBillById(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid bill id`,
            });
        }

        let bill = await Bill.findById(id).exec();

        if (bill) {
            const items = await ItemPurchased.find({ billID: id });
            const billWithItems = { ...bill.toObject(), items };

            return response.status(200).json(billWithItems);
        } else {
            return response.status(404).json({ message: "Bill not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching bills." });
    }
}

export async function saveNewBill(request, response) {
    try {
        if (!request.body.totalAmount) {
            return response.status(400).send({
                message: `Send all required fields: Total amount`,
            });
        }

        const newBill = {
            totalAmount: request.body.totalAmount,
            paymentMethod: request.body.paymentMethod || "Cash",
            discountApplied: request.body.discountApplied || 0,
        };

        const bill = await Bill.create(newBill);
        return response.status(201).send(bill);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export async function updateBill(request, response) {
    try {
        if (!request.body.totalAmount) {
            return response.status(400).send({
                message: `Send all required fields: Total amount`,
            });
        }

        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid bill id`,
            });
        }

        const result = await Bill.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({
                message: `Bill not found`,
            });
        }

        return response.status(200).send({
            message: `Bill successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export async function deleteBillById(request, response) {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid bill id`,
            });
        }

        const result = await Bill.findByIdAndDelete(id);

        if (result) {
            return response.status(404).json({
                message: `Bill successfully deleted!`,
            });
        } else {
            return response.status(404).json({ message: "Bill not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching bills." });
    }
}
