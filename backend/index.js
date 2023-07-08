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

    // create a user
    app.post("/users", async (req, res) => {
      const user = req.body;
      if (!user.name || !user.email) {
        return res.status(400).json({message: "data not found"});
      }
      // check user exist
      const isExistUser = await usersCollection.findOne({email: user.email});

      if (isExistUser) {
        return res.status(400).json({message: "Already have user"});
      }

      const result = await usersCollection.insertOne(user);
      return res.json(result);
    });

    // get all users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      return res.json(result);
    });

    // get a user using email
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      if (!email) {
        return res.status(400).json({message: "Failed to get user"});
      }
      const result = await usersCollection.findOne({email: email});
      if (!result) {
        return res.status(400).json({message: "data not found!"});
      }
      res.json(result);
    });

    // delete a user using id
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) {
        return res.json("Failed to delete user!");
      }
      const result = await usersCollection.deleteOne({_id: new ObjectId(id)});
      res.json(result);
    });

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
  res.json("<h1>Server side running!</h1>");
});

app.listen(PORT, () =>
  console.log(`Server is running port at on http://localhost:${PORT}`)
);
