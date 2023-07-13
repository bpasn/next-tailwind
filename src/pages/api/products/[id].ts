import { NextApiResponse, NextApiRequest } from "next";
import db from "@/utils/db";
import ProductModel from "@/modelSchema/Product.schema";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    console.log(req.query)
    const product = await ProductModel.findById(req.query.id);
    await db.disconnect()

    res.json(product)

}

export default handler