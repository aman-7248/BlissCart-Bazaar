import mongoose from 'mongoose' //moongoose is lib which helps to easily access MongoDB features
import colors from 'colors'

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${conn.connection.host}`.bgMagenta.blue)
    } catch(error){
        console.log(`Error is Database Connection ${error}`.bgRed.white)
    }
}

export default connectDB;