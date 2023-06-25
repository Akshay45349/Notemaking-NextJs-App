import mongoose from "mongoose";
import validator from "validator";


const noteSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    title:{
        type:String,
        required:true, 
    },
    description:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

const Notedb=mongoose.models.note || mongoose.model("note",noteSchema);

export default Notedb;

