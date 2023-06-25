import dbConnect from "../db/conn";
import Notedb from "../models/notemodel";

export default async function PATCH(req,res){
    await dbConnect();
    const {id}=req.headers;
    try {
        const data=await Notedb.findByIdAndUpdate({_id:id},JSON.parse(req.body));
        res.status(200).send("note updated");
    } catch (error) {
        res.status(500).send({message:error});
    }

}