const { MongoClient } = require('mongodb');

async function testConnection() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        await client.close();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

testConnection();