import { MongoClient, MongoClientOptions } from 'mongodb';

const url = 'mongodb+srv://admin:qwer1234@cluster0.orjwd.mongodb.net/forum?retryWrites=true&w=majority&appName=Cluster0';
const options: MongoClientOptions = {

};

let connectDB: Promise<MongoClient>; // connectDB의 타입 지정
declare global {
  var _mongo: Promise<MongoClient>; // _mongo의 타입 지정
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
