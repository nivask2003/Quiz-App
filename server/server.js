const { MongoClient } = require('mongodb');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();
const port = process.env.PORT;

const client = new MongoClient(process.env.MONGODB_URI);
const dbname = "quiz-app";

const app = express();
app.use(cors());
client.connect().then(() => {
    console.log("Server Connected");
    
}).catch((err) => {
    console.error("Server not connected", err);
});

app.get('/questions', async(req, res) =>{
    try {
        await client.connect();
        const db = client.db(dbname);
        const questionsCollection = db.collection('questions');
        const result = await questionsCollection.find({}).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});