import { connectDB } from "@/util/database"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function BookMarkChkHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        const session = await getServerSession(req, res, authOptions);
        const db = (await connectDB).db('trip')
        req.body.user_id = session?.user?.email
        await db.collection('bookmark').insertOne(req.body)
        res.status(200).json({ msg: 'success' })
    }
}