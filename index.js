const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const Animal = require("./animal");

mongoose.connect(
  "mongodb+srv://akhilpendyala69:akhil1234@animals.nxfzvi0.mongodb.net/?retryWrites=true&w=majority&appName=Animals"
);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connected"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/animal", async (req, res) => {
  const animals = await Animal.find({});
  res.send(animals);
});

app.post("/animal", async (req, res) => {
  let animal = new Animal({
    name: req.body.name,
    type: req.body.type,
    legs: req.body.legs,
  });
  book = await animal.save();
  res.send(animal);
});

app.get("/animal/:id", async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  if (!animal) return res.status(404).send("Animal not found");
  res.send(animal);
});

app.put("/animal/:id", async (req, res) => {
  const animal = await Animal.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      type: req.body.type,
      legs: req.body.legs,
    },
    { new: true }
  );

  if (!animal) return res.status(404).send("Animal not found");
  res.send(animal);
});

app.delete("/animal/:id", async (req, res) => {
  const animal = await Animal.findByIdAndDelete(req.params.id);
  if (!animal) return res.status(404).send("Animal not found");
  res.send(animal);
});

app.listen(3000, () => console.log("App running at http://localhost:3000/"));
