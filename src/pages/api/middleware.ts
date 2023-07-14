import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { JWT, getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default (handle: any) => async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const token = await getToken({
            req,
            secret: process.env.AUTH_SECRET
        })
        if (!token) {
            return res.status(401).send("Error: signin required")
        }
        req.body = { ...req.body, token };
        return handle(req, res)
    } catch (error) {
        res.status(500).json(error)
    }
}