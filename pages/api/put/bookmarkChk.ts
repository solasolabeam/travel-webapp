import { connectDB } from "@/util/database"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function BookMarkChkHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'PUT') {
        const session = await getServerSession(req, res, authOptions);
        const db = (await connectDB).db('trip')
        req.body.user_id = session?.user?.email
        const result = await db.collection('bookmark')
            .find({ user_id: req.body.user_id, contentid: req.body.contentid }).toArray()

        if (result.length === 0) {
            if('isChk' in req.body) {
                delete req.body.isChk
            }
            await db.collection('bookmark').insertOne(req.body)
            res.status(200).json({ msg: 'insert OK!' })
        } else {
            await db.collection('bookmark').deleteMany({ user_id: req.body.user_id, contentid: req.body.contentid })
            res.status(200).json({ msg: 'delete OK!' })
        }
        
    }
}