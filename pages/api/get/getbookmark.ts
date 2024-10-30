import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function getbookmarkHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET') {
        const session = await getServerSession(req, res, authOptions)

        if (session) {
            const db = (await connectDB).db('trip')
            const result = await db.collection('bookmark').find({ user_id: session.user?.email }).toArray()
            res.status(200).json(result)
        } else {
            res.status(200).json({ msg: 'not found session' })
        }
    }
}