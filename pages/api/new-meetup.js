// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";
import { connectDatabase } from "../../libF/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const client = await connectDatabase();

      const db = client.db();

      const result = await db.collection("meetups").insertOne(data);


      res.status(201).json({ message: "Meetup inserted!" });

    } catch (error) {
        console.error("REAL ERROR:", error); // 
        
      res.status(500).json({ message: "Failed" });
    }
  }
}

// mongodb+srv://MoazMahmoud:Mdb#274118@cluster0.0gz9sci.mongodb.net/ 
// 'mongodb+srv://MoazMahmoud:Mdb#274118@cluster0.0gz9sci.mongodb.net/meetups?retryWrites=true&w=majority'
// mdb123456  || testUser