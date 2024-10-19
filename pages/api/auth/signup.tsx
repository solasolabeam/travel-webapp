import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash
        const db = (await connectDB).db('trip');
        await db.collection('user_cred').insertOne(req.body)
        res.status(200).json({ message: 'User created successfully' })
    }
}