import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)
        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        const db = (await connectDB).db('trip');
        await db.collection('user_cred').insertOne(req.body)
        res.status(200).json({ msg: 'success' })
    }
}