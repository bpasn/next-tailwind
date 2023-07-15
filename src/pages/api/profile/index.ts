import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../middleware";
import db from "@/utils/db";

export default middleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.body
})