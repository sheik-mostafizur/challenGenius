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
    const coursesCollection = client.db("challenGenius").collection("courses");
    const htmlAndCSSCollection = client
      .db("challenGenius")
      .collection("htmlAndCSS");
    const paymentsCollection = client
      .db("challenGenius")
      .collection("payments");

    // =========== users routes ===========
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

    // =============== admin routes ===============
    // get all users
    app.get("/admin/users", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({message: "email not found!"});
      }
      const isAdmin = await usersCollection.findOne({
        email,
        role: "admin",
      });
      if (!isAdmin) {
        return res.status(400).json({message: "Something went wrong!"});
      }

      const result = await usersCollection.find().toArray();
      return res.json(result);
    });

    // delete a user
    app.delete("/admin/users/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({message: "Something went wrong!"});
      }
      const result = await usersCollection.deleteOne({_id: new ObjectId(id)});
      res.send(result);
    });

    // =============== admin course modules routes ===============

    // get modules count number
    app.get("/admin/courses/:id/modules/total-modules", async (req, res) => {
      // 64ad76891e5665a2fbd40732 for HTML
      if (req.params.id !== "64ad76891e5665a2fbd40732") {
        return res.send("Something is wrong");
      }
      const result = await htmlAndCSSCollection.find().toArray();
      const totalModules = result.length;
      return res.json(totalModules);
    });

    // post a module
    app.post("/admin/courses/:id/modules", async (req, res) => {
      // 64ad76891e5665a2fbd40732 for HTML
      if (req.params.id !== "64ad76891e5665a2fbd40732") {
        return res.send("Something is wrong");
      }
      const module = req.body;
      if (!module) {
        return res.status(400).json({message: "data not found"});
      }
      const result = await htmlAndCSSCollection.insertOne(module);
      return res.json(result);
    });

    // get all modules
    app.get("/admin/courses/:id/modules", async (req, res) => {
      // 64ad76891e5665a2fbd40732 for HTML
      if (req.params.id !== "64ad76891e5665a2fbd40732") {
        return res.send("Something is wrong");
      }
      const result = await htmlAndCSSCollection.find().toArray();
      return res.json(result);
    });

    // get a module
    app.get("/admin/courses/:courseId/modules/:id", async (req, res) => {
      // 64ad76891e5665a2fbd40732 for HTML
      if (req.params.courseId !== "64ad76891e5665a2fbd40732") {
        return res.send("Something is wrong");
      }
      const result = await htmlAndCSSCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      return res.json(result);
    });

    // update a module
    app.put("/admin/courses/:courseId/modules/:id", async (req, res) => {
      // 64ad76891e5665a2fbd40732 for HTML
      if (req.params.courseId !== "64ad76891e5665a2fbd40732") {
        return res.send("Something is wrong");
      }
      const updatedDoc = req.body;
      const result = await htmlAndCSSCollection.updateOne(
        {_id: new ObjectId(req.params.id)},
        {$set: updatedDoc}
      );
      res.json(result);
    });

    // =============== admin courses routes ===============

    // create a courses collection
    app.post("/admin/courses", async (req, res) => {
      const course = req.body;
      if (!course) {
        return res.status(400).json({message: "data not found"});
      }
      const result = await coursesCollection.insertOne(course);
      return res.json(result);
    });

    // get all courses
    app.get("/admin/courses", async (req, res) => {
      const result = await coursesCollection.find().toArray();
      return res.json(result);
    });

    // get a course from courses
    app.get("/admin/courses/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) {
        return res.json("Failed!");
      }
      const result = await coursesCollection.findOne({_id: new ObjectId(id)});
      res.json(result);
    });

    // update a course from courses
    app.put("/admin/courses/:id", async (req, res) => {
      const id = req.params.id;
      const updatedDoc = req.body;
      const result = await coursesCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: updatedDoc}
      );
      res.json(result);
    });

    // =============== courses routes ===============
    // get courses
    app.get("/courses", async (req, res) => {
      const result = await coursesCollection.find().toArray();
      res.json(result);
    });

    // get a course
    app.get("/courses/:id", async (req, res) => {
      const result = await coursesCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.json(result);
    });

    // =============== enrolled courses routes ===============

    // =============== payments courses routes ===============
    // post a payments
    app.post("/payments", async (req, res) => {
      const paymentDetails = req.body;

      const isExist = await paymentsCollection.findOne({
        courseId: paymentDetails.courseId,
        email: paymentDetails.email,
      });
      if (isExist) {
        return res.status(409).json("Already enrolled");
      }
      const result = await paymentsCollection.insertOne(paymentDetails);
      res.json(result);
    });

    // get payments
    app.get("/payments", async (req, res) => {
      const result = await paymentsCollection.find().toArray();
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
  res.send("<h1>Server side running!</h1>");
});

app.listen(PORT, () =>
  console.log(`Server is running port at on http://localhost:${PORT}`)
);
