const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;


const catagory = require("./data/catagory.json");
const car = require("./data/./car.json");

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eypqquv.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Toy Server is Running');
})


app.get("/catagory", (req, res) => {
  res.send(catagory);
});

app.get("/car", (req, res) => {
  res.send(car);
});


app.get("/car/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const selecteCar = car.find((n) => n._id === id);
  res.send(selecteCar);
});


app.get("/catagory/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const carCatgory = car.filter(n => n.category_id == id);
  res.send(carCatgory);
});


app.listen(port, () => {
    console.log(`Toy Server Port On ${port}`);
})