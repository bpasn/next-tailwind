import OrderModel from "@/modelSchema/Order.schema";
import { IOrders } from "@/models/orders";
import db from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../middleware";
import { getError } from "@/utils/error";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

interface MyRequest extends NextApiRequest {
    body: IOrders & { token: JWT }
}
export default middleware(async (req: MyRequest, res: NextApiResponse) => {
    const { token } = req.body

    try {
        await db.connect();
        const newOrder = new OrderModel<IOrders>({
            ...req.body,
            orderItems:req.body.orderItems,
            user: token._id as string
        })
        console.log(newOrder.orderItems)
        const order = await newOrder.save();
        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({ error: getError(error) })
    }
})
