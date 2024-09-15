import mongoose from "mongoose";
import 'dotenv/config'
const MONGO_URL = process.env.MONGO_URL;

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB:", err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}