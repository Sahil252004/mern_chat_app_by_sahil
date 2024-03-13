import mongoose from "mongoose";

const connectToMongodb = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongodb");
    }catch(e)
    {
        console.log("Error to connecting with mongodb");
    }
}

export default connectToMongodb;

