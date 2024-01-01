import { DB_NAME } from "../constants.js";
import mongoose from "mongoose"

const connectDB = async () =>{
      try {
            const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log(`\n MongoDB Connected successfully !! DB HOST : ${(await connectionInstance).connection.host}`)
      } catch (error) {
            console.log("MongoDB connection error : ", error)
            process.exit(1)
      }
}

export default connectDB