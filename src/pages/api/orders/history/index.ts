import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware";
import db from '@/utils/db'
import OrderModel from '@/modelSchema/Order.schema'
import { getError } from "@/utils/error";
export default middleware(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await db.connect();
        const order = await OrderModel.find({});
        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({ error: getError(error) })
    }
})