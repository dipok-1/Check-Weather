import mongoose from "mongoose";
const schema = mongoose.Schema;

const taskSchema = new schema({
    title:{
        type:String,
        requireed:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
       type:String,
       required:true
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    }

},{timestamps:true})

const taskmodel = mongoose.model('userdata',taskSchema)
export default taskmodel