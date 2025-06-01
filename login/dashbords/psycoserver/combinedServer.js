const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 3000; // You can choose any port you prefer

app.use(express.json());
app.use(cors());

const url = "mongodb://127.0.0.1:27017";
const dbName = "students";
const collectionName = "marks";

// Endpoint to submit data
app.post("/submit", async (req, res) => {
  const results = req.body;
  console.log("Received data:", results); // Log the received data

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne(results);
    console.log("Data inserted into MongoDB");
    res.send("Data inserted into MongoDB");
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    res.status(500).send("Error inserting data into MongoDB");
  }
});

// Endpoint to fetch reports
app.get("/reports", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const reports = await collection.find({}).toArray();
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports from MongoDB:", error);
    res.status(500).send("Error fetching reports from MongoDB");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
