import { connect } from "mongoose";

async function connectMongo() {
  await connect(process.env.MONGO_URL);
}

export default connectMongo;
