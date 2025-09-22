

import mongoose from 'mongoose'

async function mongodb(){
     try {
        const mongoUri = process.env.MONGO_URL;
        console.log(mongoUri)
        if (!mongoUri) {
          throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(mongoUri)
        console.log("mongodb is connected")
     } catch (error) {
        console.log("mongodb is not connected",error)
     }
}
export default mongodb