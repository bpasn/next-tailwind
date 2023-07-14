import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../middleware";
import db from "@/utils/db";
import OrderModel from "@/modelSchema/Order.schema";
import { IOrders } from "@/models/orders";

export default middleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    await db.connect();
    const order = await OrderModel.findById(id);
    await db.disconnect();
    res.send(order as IOrders);
})