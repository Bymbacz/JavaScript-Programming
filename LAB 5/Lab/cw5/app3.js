import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.locals.pretty = app.get("env") === "development";

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

const dbUrl = "mongodb://127.0.0.1:27017/AGH";

mongoose
  .connect(dbUrl, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });
const studentSchema = new mongoose.Schema({
  Imie: String,
  Nazwisko: String,
  Wydzial: String,
});

const Student = mongoose.model("Student", studentSchema);
app.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.render("index", { students, showDepartment: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/:department", async (req, res) => {
  const department = req.params.department;

  try {
    const students = await Student.find({ Wydzial: department });
    res.render("index", { students, showDepartment: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/submit", (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  res.send(`Hello ${req.body.name}`);
});

app.listen(8000, () => {
  console.log("The server was started on port 8000");
  console.log('To stop the server, press "CTRL + C"');
});
