import mongoose from "mongoose";
const connectDb = async () => {
  const ConnectionUrl =
    "mongodb+srv://swanithpidugu:Swanith%40123@cluster0.w25mn.mongodb.net/test?retryWrites=true&w=majority";
  mongoose
    .connect(ConnectionUrl)
    .then(() => console.log("db connection successful"))
    .catch((e) => console.log("db connection error", e));
};

export default connectDb;
