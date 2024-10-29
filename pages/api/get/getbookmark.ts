import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getbookmarkHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET') {
        const db = (await connectDB).db('trip')
        const result = await db.collection('bookmark').find().toArray()
        res.status(200).json(result)
    }
}