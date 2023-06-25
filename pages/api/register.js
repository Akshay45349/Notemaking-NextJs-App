import dbConnect from "./db/conn";
import Userdb from "./models/usermodel";

export default async function POST(req, res) {
    try {

        await dbConnect();
        const user1 = new Userdb(JSON.parse(req.body));

        const userData = await user1.save();

        console.log("User Created");
        console.log(userData);
        res.status(200).send("User Created");
    } catch (error) {
        console.log(error);
        res.status(500).send("internals server error");
    }
}