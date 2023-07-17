import ProductModel from "@/modelSchema/Product.schema";
import db from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { category } = req.query
    await db.connect();
    const products = await ProductModel.find({category}).lean();
    await db.disconnect();
    res.status(200).json(products)
}