import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";




//collection schema

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
        
    },

    password:{
        type:String,
        required:true
    },
     
},
{
    timestamps:true
})



loginSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
    next();
    
});

// collection creation
const Userdb=mongoose.models.login || mongoose.model("login",loginSchema);


export default Userdb;