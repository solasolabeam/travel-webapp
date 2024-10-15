import { connectDB } from "@/util/database"

export default async function Home() {
  interface User {
    _id: string; // MongoDB에서 자동 생성되는 ID
    test1: string;
    test2: string;
  }

  const client = await connectDB;
  const db = client.db('trip');
  const result = await db.collection<User>('post').find({}).toArray();
  console.log('result', result)
  return (
    <div>테스트2</div>
  );
}
