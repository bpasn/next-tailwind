import ProductModel from "@/modelSchema/Product.schema";
import User from "@/modelSchema/User.schema";
import data from "@/utils/data";
import db from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users)
    await ProductModel.deleteMany();
    await ProductModel.insertMany(data.products)
    await db.disconnect();
    res.send({message:"Seeded successfully!"})
}

export default handler;