import Notedb from "../models/notemodel";
import dbConnect from "../db/conn";




export default async function POST(req,res){
    
    try {
        await dbConnect();
        const data=await Notedb.find(JSON.parse(req.body));
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("internal server error");
    }




}