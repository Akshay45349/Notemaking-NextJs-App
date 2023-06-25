import mongoose from "mongoose";

const uri="mongodb+srv://akshay:Ab850$ka@akcluster.kxv4bce.mongodb.net/aknote?retryWrites=true&w=majority";

const dbConnect=async()=>{
    await mongoose.connect(uri);
    // console.log("DB connected");
}

export default dbConnect;