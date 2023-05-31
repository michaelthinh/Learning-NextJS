// POST /api/new-meetup

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === "POST") {
        console.log("connected");
        const data = req.body;
        const client = await MongoClient.connect(
            "mongodb+srv://lamtieuki:CXNZrzYqdYklTdSg@cluster0.oudrdi3.mongodb.net/meetups?retryWrites=true&w=majority"
        );
        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({
            message: "Meetup inserted",
        });
    }
};

export default handler;
