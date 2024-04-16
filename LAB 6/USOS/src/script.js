import http from "node:http";
import { URL } from "node:url";
import { Chart } from "chart.js";
import fs from "fs";
import React from "react";
import ReactDOM from "react-dom";
import { JSDOM } from "jsdom";
import { useRef, useEffect } from "react";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routerTeacher = express.Router();
const routerStudent = express.Router();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", "./views");
app.set("view engine", "pug");

const html = `<!DOCTYPE html>
<html lang="en">
  <!-- Zmień wartość "lang" z 'en' na 'pl' -->
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" media="screen" type="text/css" />
    <link rel="shortcut icon" href="/Canwas.png">
    <script
    src="https://unpkg.com/react/umd/react.development.js"
    crossorigin=""
    ></script>
    <script
      src="https://unpkg.com/react-dom/umd/react-dom.development.js"
      crossorigin=""
    ></script>
    <script src="https://unpkg.com/babel-standalone/babel.min.js"></script>


    <!-- Icons -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
    <title>Wyższa Szkoła Informatyki</title>
  </head>

  <body>
    <div id="all">
      <div class="nav">
        <div class="menu">
          <i class="fa-solid fa-graduation-cap"></i>
          Wyższa Szkoła Informatyki
          <div id="studia">
            <ol>
              <li>
                <span style="font-size: 1.1vw; color: grey">Studia ▼</span>
                <ul>
                  <li>Stacjonarne</li>
                  <li>Niestacjonarne</li>
                  <li><hr /></li>
                  <li>Informatyka</li>
                  <li>Webmastering</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
        <div class="menu">
          <input type="text" class="search" placeholder="Szukaj" />
          <input type="button" class="btn" value="Szukaj" />
        </div>
        <div class="menu"><button id="USOS" style="border: none; background-color: inherit; " ref={ref}>USOS</button></div>
      </div>
      <div class="main">
        <div class="slider">
          <p>Aplikuj już dziś</p>
          <img src="/zdj1.webp" />
          <label>Nie śpij, bo cię inni ubiegną</label>
          <div class="paski">
            <div class="pasek" style="opacity: 0.5"></div>
            <div class="pasek"></div>
            <div class="pasek" style="opacity: 0.5"></div>
          </div>
          <div class="arrow1">
            <i
              class="fa-solid fa-angle-right"
              style="color: #ffffff; font-size: 2vw"
            ></i>
          </div>
          <div class="arrow2">
            <i
              class="fa-solid fa-angle-left"
              style="color: #ffffff; font-size: 2vw"
            ></i>
          </div>
        </div>

        <div id="logowanie"></div>

        <div class="articles">
          <div class="art">
            <label class="title">Oferty zatrudnienia</label>
            <hr />
            <img src="/zdj2.jpeg" />
            <ul>
              <li>
                <a href="https://www.google.com/" target="_blank">Google</a>
              </li>
              <li><a href="https://www.ibm.com/" target="_blank">IBM</a></li>
            </ul>
          </div>
          <div class="art">
            <label class="title">Kierunki</label>
            <hr />
            <img src="/zdj3.webp" />
            <table>
              <thead>
                <tr style="background-color: green;"> <th> Kierunek <th>Czesne
              <tbody>
                <tr style="background-color: grey;"> <td> Informatyka <td> 4000 zł/semestr
                <tr> <td> Webmastering <td> 3500 zł/semestr
          </table>
          </div>
          <div class="art">
            <label class="title">Zaplecze dydaktyczne</label>
            <hr />
            <img src="/zdj4.jpeg" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio voluptas facere id asperiores fugiat nam, reprehenderit sint harum, veritatis quae culpa assumenda sequi cum eligendi molestiae eum optio! Quis modi debitis fugit cum, similique nulla saepe magni ut velit rerum. Voluptatum id obcaecati quaerat animi velit! Facilis quasi eveniet placeat odit quia, expedita, quibusdam iure animi hic voluptatem recusandae est enim ad minus laboriosam aliquid optio mollitia cumque ex!
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="footer_div">
          <b>Adres siedziby:</b>
          <p>Wyższa szkoła informatyki</p>
          <p>ul. Jakaśtam</p>
          <p>30-836 Kraków</p>
        </div>
        <div class="footer_div">
          <b>Kontakt:</b>
          <p><i class="fa-solid fa-envelope"></i> <a href="mailto:szkolawyzsza@hej.pl">szkolawyzsza@hej.pl</a></p>
          <p><i class="fa-light fa-mobile"></i> <a href="tel:+48603111228">+48 603-111-228</a></p>
        </div>
        <div class="footer_div">
          <p><a href="https://www.facebook.com/" target=""><i class="fa-brands fa-facebook"></i></a> <a href="https://www.twitter.com/" target="_blank"><i class="fa-brands fa-twitter"></i></a></p>
        </div>
      </div>
    </div>
  </body>
  <script type="text/babel">
    class YourPage extends React.Component {
      render() {
        return (
          <div>
            <h1>Gratulacje!!!</h1>
            <h2>Zalogowałeś się!!!</h2>
            <h3>To twoja strona</h3>
          </div>);
      }
    }
    class Formsik extends React.Component {
      render() {
        return (<div>
            <form method="POST" action="/login">
              <p>Logowanie do USOS</p>
              <label>
                Login:
                <input
                  name="login"
                  type="text"
                />
              </label>
              <br></br>
              <label>
                Hasło:
                <input
                  type="password"
                  name="password"
                />
              </label>
              <br></br>
              <input type="submit" value="Zaloguj" />
            </form>
            <br></br>
          </div>);
      }
    }
    const usosButton = document.querySelector("#USOS");
    usosButton.addEventListener("click", () => {
      console.log("USOS button was clicked!");
      const container = document.getElementById("logowanie");
      const root = ReactDOM.createRoot(container);
      root.render(<Formsik />);
      usosButton.disabled = true;
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</html>`;

const dbUrl = "mongodb://127.0.0.1:27017/JS";

mongoose
  .connect(dbUrl, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

const userSchema = new mongoose.Schema(
  {
    Imie: String,
    Nazwisko: String,
    Login: String,
    Haslo: String,
    Kto: String,
  },
  { collection: "uzytkownicy" }
);
const ocenaSchema = new mongoose.Schema(
  {
    Imie: String,
    Nazwisko: String,
    Przedmioty: [
      {
        Nazwa: String,
        Oceny: [Number],
      },
    ],
  },
  { collection: "oceny" }
);
const User = mongoose.model("User", userSchema);
const Ocena = mongoose.model("Ocena", ocenaSchema);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

routerTeacher.get("/", async (req, res) => {
  const imie = req.session.Imie;
  const nazwisko = req.session.Nazwisko;
  try {
    const studenci = await Ocena.find({});
    const studenciList = studenci.map(
      (s) =>
        `<a href="/teacher/${s.Imie}/${s.Nazwisko}">${s.Imie} ${s.Nazwisko}</a>`
    );
    res.send(`<html>
                <body>
                  <h1>Witaj ${imie} ${nazwisko}</h1>
                  <ul>
                    ${studenciList.map((s) => `<li>${s}</li>`).join("")}
                  </ul>
                </body>
              </html>`);
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).send("Wystąpił błąd");
  }
});

routerTeacher.get("/:imie/:nazwisko", async (req, res) => {
  const imie = req.session.Imie;
  const nazwisko = req.session.Nazwisko;
  const studentImie = req.params.imie;
  const studentNazwisko = req.params.nazwisko;
  try {
    const studentDoc = await Ocena.findOne({
      Imie: studentImie,
      Nazwisko: studentNazwisko,
    });
    if (!studentDoc) {
      console.error("Taki student nie istnieje");
      return res.status(400).send("Taki student nie istnieje");
    }
    const przedmioty = studentDoc.Przedmioty.map((p) => p.Nazwa);
    res.send(`<html>
                <body>
                  <h1>Witaj ${imie} ${nazwisko}</h1>
                  <form id="formularz" method="POST" action="/">
                    <input type="hidden" name="student" value="${studentImie} ${studentNazwisko}"/>
                    <select name="ocena">
                      <option value=2>2</option>
                      <option value=3>3</option>
                      <option value=4 selected>4</option>
                      <option value=5>5</option>
                    </select>
                    <select name="przedmiot">
                      ${przedmioty
                        .map((p) => `<option value="${p}">${p}</option>`)
                        .join("")}
                    </select>
                    <input type="number" name="indeks" placeholder="Indeks oceny do zamiany"/>
                    <br/>
                    <br/>
                    <input type="submit" name="komenda" value="Zmień ocenę"/>
                    <input type="submit" name="komenda" value="Dodaj ocenę"/>
                  </form>
                </body>
              </html>`);
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).send("Wystąpił błąd");
  }
});

routerStudent.get("/", async (req, res) => {
  const imie = req.session.Imie;
  const nazwisko = req.session.Nazwisko;
  try {
    const studentDoc = await Ocena.findOne({ Imie: imie, Nazwisko: nazwisko });
    if (!studentDoc) {
      console.error("Taki student nie istnieje");
      return res.status(400).send("Taki student nie istnieje");
    }
    const przedmioty = studentDoc.Przedmioty.map((p) => p.Nazwa);

    const przedmiotyList = przedmioty.map(
      (p) => `<a href="/student/${p}">${p}</a>`
    );

    res.send(`<html>
                <body>
                  <h1>Witaj ${imie} ${nazwisko}</h1>
                  <ul>
                    ${przedmiotyList.map((p) => `<li>${p}</li>`).join("")}
                  </ul>
                </body>
              </html>`);
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).send("Wystąpił błąd");
  }
});

routerStudent.get("/:przedmiot", async (req, res) => {
  const imie = req.session.Imie;
  const nazwisko = req.session.Nazwisko;
  const przedmiot = req.params.przedmiot;
  try {
    const studentDoc = await Ocena.findOne({ Imie: imie, Nazwisko: nazwisko });
    if (!studentDoc) {
      console.error("Taki student nie istnieje");
      return res.status(400).send("Taki student nie istnieje");
    }
    const przedmiotDoc = studentDoc.Przedmioty.find(
      (p) => p.Nazwa === przedmiot
    );
    if (!przedmiotDoc) {
      console.error("Taki przedmiot nie istnieje");
      return res.status(400).send("Taki przedmiot nie istnieje");
    }
    const oceny = przedmiotDoc.Oceny;
    const ocenyCounts = {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    oceny.forEach((ocena) => {
      ocenyCounts[ocena]++;
    });

    const labels = Object.keys(ocenyCounts);
    const data = Object.values(ocenyCounts);
    res.send(`<html>
                <body>
                  <div>
                    <canvas id="myChart" style="border: black solid 1px; width: 800px;"></canvas>
                  </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <script>
                  const ctx = document.getElementById("myChart");

                  var chart = new Chart(ctx, {
                    type: "bar",
                    data: {
                      labels: ${JSON.stringify(labels)},
                      datasets: [
                        {
                          label: "Oceny studenta ${imie} ${nazwisko} z przedmiotu ${przedmiot}",
                          data: ${JSON.stringify(data)},
                          borderWidth: 1,
                        },
                      ],
                    },
                  });
                </script>
              </html>`);
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).send("Wystąpił błąd");
  }
});

app.use("/teacher", routerTeacher);
app.use("/student", routerStudent);

app.get("/", async (req, res) => {
  //res.send(html);
  const students = await Ocena.find({});
  const student = students[0];
  const przedmioty = student.Przedmioty.map((p) => p.Nazwa);
  res.render("index", { students, przedmioty });
});

app.post("/", async (req, res) => {
  const { student, ocena, przedmiot, indeks, komenda } = req.body;
  const grade = parseInt(ocena);
  const kom = komenda.replace("+", " ");
  console.log(student, grade, przedmiot, indeks, kom);
  let imie = student.split(" ")[0];
  let nazwisko = student.split(" ")[1];
  try {
    const studentDoc = await Ocena.findOne({ Imie: imie, Nazwisko: nazwisko });
    if (!studentDoc) {
      console.error("Taki student nie istnieje");
      return res.status(400).send("Taki student nie istnieje");
    }

    switch (kom) {
      case "Dodaj ocenę":
        // Znajdź odpowiedni przedmiot i dodaj ocenę
        const przedmiotDoc = studentDoc.Przedmioty.find(
          (p) => p.Nazwa === przedmiot
        );
        if (!przedmiotDoc) {
          console.error("Taki przedmiot nie istnieje");
          return res.status(400).send("Taki przedmiot nie istnieje");
        }

        przedmiotDoc.Oceny.push(grade);
        await studentDoc.save();
        return res.status(200).send("Ocenę dodano pomyślnie");

      case "Zmień ocenę":
        // Znajdź odpowiedni przedmiot i zmień ocenę
        const przedmiotDocToChange = studentDoc.Przedmioty.find(
          (p) => p.Nazwa === przedmiot
        );
        if (!przedmiotDocToChange) {
          console.error("Taki przedmiot nie istnieje");
          return res.status(400).send("Taki przedmiot nie istnieje");
        }

        if (indeks >= przedmiotDocToChange.Oceny.length) {
          console.error("Podany indeks nie istnieje");
          return res.status(400).send("Podany indeks nie istnieje");
        }

        przedmiotDocToChange.Oceny[indeks] = grade;
        await studentDoc.save();
        return res.status(200).send("Ocenę zmieniono pomyślnie");
      default:
        console.error("Nieznana funkcja");
        return res.status(400).send("Nieznana funkcja");
    }
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).send("Wystąpił błąd");
  }
});

app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    console.error(login, password);
    const user = await User.findOne({ Login: login });

    if (user == null) {
      console.error("Taki login nie istnieje");
      return res.status(401).send("Nieprawidłowy login lub hasło");
    }
    if (user.Haslo != password) {
      console.error("Niepoprawne hasło");
      return res.status(401).send("Nieprawidłowy login lub hasło");
    }

    req.session.userType = user.Kto;
    req.session.Imie = user.Imie;
    req.session.Nazwisko = user.Nazwisko;

    if (user.Kto === "Student") {
      res.redirect("/student");
    } else if (user.Kto === "Nauczyciel") {
      res.redirect("/teacher");
    } else {
      res.status(403).send("Brak uprawnień do zalogowania");
    }
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    res.status(500).send("Wystąpił błąd podczas logowania");
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Ocena.find({});
    res.json(students);
  } catch (error) {
    console.error("Błąd:", error);
    res.status(500).json({ error: "Wystąpił błąd" });
  }
});

app.get("/api/students/xml", async (req, res) => {
  try {
    const students = await Ocena.find({});
    // Tutaj przekształć dane students na format XML, na przykład za pomocą biblioteki do generowania XML
    const xmlData = generateXmlFromStudents(students); // Implementuj tę funkcję

    res.header("Content-Type", "application/xml");
    res.send(xmlData);
  } catch (error) {
    console.error("Błąd:", error);
    res.status(500).json({ error: "Wystąpił błąd" });
  }
});

app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(8000, () => {
  console.log("Serwer uruchomiony na porcie 8000");
});
