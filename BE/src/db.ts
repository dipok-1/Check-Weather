

import mongoose from 'mongoose'

async function mongodb(){
     try {
        await mongoose.connect('mongodb+srv://dipokdutta876:AIq3kRjCYgtPH2or@myproject.nqrg7.mongodb.net/WeatherDatabase')
        console.log("mongodb is connected")
     } catch (error) {
        console.log("mongodb is not connected")
     }
}
export default mongodb