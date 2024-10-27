import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function getBookMarksHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET') {
        const session = await getServerSession(req, res, authOptions)
        const db = (await connectDB).db('trip')
        const result = await db.collection('bookmark').find({user_id: session?.user?.email}).toArray()
        res.status(200).json(result)
    }
}