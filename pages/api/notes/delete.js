import dbConnect from "../db/conn";
import Notedb from "../models/notemodel";

export default async function PATCH(req,res){
    await dbConnect();
    const {id}=req.headers;
    try {
        await Notedb.findByIdAndDelete({_id:id});
        res.status(200).send("note deleted");
    } catch (error) {
        res.status(500).send({message:error});
    }

}