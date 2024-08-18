import mongoose from "mongoose";


export const ConnectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log(error,'Error while connecting db')
    }
}




