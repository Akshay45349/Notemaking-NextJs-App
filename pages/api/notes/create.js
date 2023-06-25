import Notedb from "../models/notemodel";
import dbConnect from "../db/conn";




export default async function POST(req,res){
    
    try {
        await dbConnect();
        // console.log(JSON.parse(req.body));
        const note=new Notedb(JSON.parse(req.body));
        const usernote=await note.save();
        // console.log(usernote);
        res.status(200).send("Notes created");
    } catch (error) {
        res.status(500).send("internal server error");
    }




}