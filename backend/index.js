require("dotenv").config();
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kzpijcj.mongodb.net/?retryWrites=true&w=majority`;

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db("challenGenius").collection("users");

    // user

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ping: 1});
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// route
app.get("/", (req, res) => {
  res.send("<h1>Server side running!</h1>");
});

app.listen(PORT, () =>
  console.log(`Server is running port at on http://localhost:${PORT}`)
);
