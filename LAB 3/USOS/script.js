const dbName = "MyDatabase";
const dbVersion = 1;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
  console.error("Error opening database");
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;

  if (!db.objectStoreNames.contains("students")) {
    const table = db.createObjectStore("students", { keyPath: "name" });

    // Tworzenie indeksu dla przedmiotu (np. WF, Java, JS, ASD)
    table.createIndex("by_subject", "subject", { unique: false });
  }
};

request.onsuccess = function (event) {
  console.log("Database opened successfully");
};

var data = {
  "Jan Mickiewicz": {
    WF: [2, 3, 4],
    Java: [4],
    JS: [5, 5, 5],
    ASD: [4, 4, 2],
    Login: "JanMickiewicz",
    Haslo: "1234",
  },
  "Juliusz Matejko": {
    WF: [3, 4],
    Java: [4, 5],
    JS: [5, 5],
    ASD: [4, 3, 2],
    Login: "JuliuszMatejko",
    Haslo: "1234",
  },
  "Kacper Kopernik": {
    WF: [2, 3, 3],
    Java: [3, 3, 3],
    JS: [3, 5, 5],
    ASD: [3, 3, 2],
    Login: "KacperKopernik",
    Haslo: "1234",
  },
  "Michał Chopin": {
    WF: [2],
    Java: [4, 5, 5],
    JS: [5, 2],
    ASD: [4],
    Login: "MichalChopin",
    Haslo: "1234",
  },
};

var login = {
  JanMickiewicz: {
    Imie: "Jan",
    Nazwisko: "Mickiewicz",
    Login: "JanMickiewicz",
    Haslo: "1234",
  },
  JuliuszMatejko: {
    Imie: "Juliusz",
    Nazwisko: "Matejko",
    Login: "JuliuszMatejko",
    Haslo: "1234",
  },
  KacperKopernik: {
    Imie: "Kacper",
    Nazwisko: "Kopernik",
    Login: "KacperKopernik",
    Haslo: "1234",
  },
  MichalChopin: {
    Imie: "Michał",
    Nazwisko: "Chopin",
    Login: "MichalChopin",
    Haslo: "1234",
  },
};

request.onsuccess = function (event) {
  const db = event.target.result;
  const transaction = db.transaction("students", "readwrite");
  const table = transaction.objectStore("students");

  Object.entries(data).forEach(([name, grades]) => {
    table.add({ name, grades });
  });

  transaction.oncomplete = function (event) {
    console.log("Data added successfully");
  };
};

function ButtonHandler() {
  var text = document.forms.f.k.value.split("\n");
  text.forEach((element) => {
    let komenda = element.split(" ");
    MyFun(komenda);
  });
}

const ctx = document.getElementById("myChart");

var chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [2, 3, 4, 5],
    datasets: [
      {
        label: "Oceny studenta",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

function openDatabase() {
  return new Promise((resolve, reject) => {
    const dbName = "MyDatabase";
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function (event) {
      reject(new Error("Error opening database"));
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("students")) {
        const table = db.createObjectStore("students", { keyPath: "name" });
        table.createIndex("by_subject", "subject", { unique: false });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };
  });
}

function MyFun(komenda) {
  openDatabase()
    .then((db) => {
      const transaction = db.transaction("students", "readwrite");
      const table = transaction.objectStore("students");

      const studentName = komenda[1] + " " + komenda[2];

      let grade = parseInt(document.forms.f.o.value);

      const getRequest = table.get(studentName);

      getRequest.onsuccess = function (event) {
        const student = event.target.result;

        if (!student) {
          console.error("Taki student nie istnieje");
          return;
        }

        let subject = komenda[3];

        switch (komenda[0]) {
          case "1":
            if (komenda.length != 4) {
              console.error("Zła ilość argumentów dla 1 funkcji");
              return;
            }
            if (!student.grades.hasOwnProperty(subject)) {
              console.error("Taki przedmiot nie istnieje");
              return;
            }

            console.log("Przed:", student.grades[subject]);
            student.grades[subject].push(grade);
            console.log("Po:", student.grades[subject]);
            break;

          case "2":
            if (komenda.length != 5) {
              console.error("Zła ilość argumentów dla 2 funkcji");
              return;
            }
            if (!student.grades.hasOwnProperty(subject)) {
              console.error("Taki przedmiot nie istnieje");
              return;
            }
            let i = parseInt(komenda[4]);
            if (i >= student.grades[subject].length) {
              console.error("Podany indeks nie istnieje");
              return;
            }

            console.log("Przed:", student.grades[subject]);
            student.grades[subject][i] = grade;
            console.log("Po:", student.grades[subject]);
            break;

          case "3":
            if (komenda.length != 3) {
              console.error("Zła ilość argumentów dla 3 funkcji");
              return;
            }

            let oceny = [];

            Object.values(student.grades).forEach((subjectGrades) => {
              oceny.push(...subjectGrades);
            });

            console.log("Oceny:", oceny);
            chart.data.datasets[0].data = [
              oceny.filter((x) => x == 2).length,
              oceny.filter((x) => x == 3).length,
              oceny.filter((x) => x == 4).length,
              oceny.filter((x) => x == 5).length,
            ];
            chart.update();

            break;

          default:
            console.error("Nieznana funkcja");
            return;
        }

        const putRequest = table.put(student);

        putRequest.onsuccess = function (event) {
          console.log("Dane studenta zaktualizowane");
        };
      };

      getRequest.onerror = function (event) {
        console.error("Błąd przy pobieraniu danych studenta");
      };
    })
    .catch((error) => {
      console.error("Błąd podczas przetwarzania operacji:", error);
    });
}

// lab 3

class YourPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Gratulacje!!!</h1>
        <h2>Zalogowałeś się!!!</h2>
        <h3>To twoja strona</h3>
      </div>
    );
  }
}

class Formsik extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", haslo: "" };
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeHaslo = this.handleChangeHaslo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeLogin(event) {
    this.setState({ login: event.target.value });
  }
  handleChangeHaslo(event) {
    this.setState({ haslo: event.target.value });
  }

  handleSubmit(event) {
    const { data } = this.props;
    if (
      data[this.state.login] !== undefined &&
      this.state.login === data[this.state.login].Login &&
      this.state.haslo === data[this.state.login].Haslo
    ) {
      alert("Zalogowano poprawnie");
      const container = document.getElementById("all");

      const root = ReactDOM.createRoot(container);
      root.render(<YourPage />);
    } else {
      alert("Błędne dane logowania");
    }
    event.preventDefault();
    this.setState({ login: "", haslo: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Logowanie do USOS</p>
          <label>
            Login:
            <input
              type="text"
              value={this.state.login}
              onChange={this.handleChangeLogin}
            />
          </label>
          <br></br>
          <label>
            Hasło:
            <input
              type="password"
              value={this.state.haslo}
              onChange={this.handleChangeHaslo}
            />
          </label>
          <br></br>
          <input type="submit" value="Zaloguj" />
        </form>
        <br></br>
      </div>
    );
  }
}

var USOSbtn = document.querySelector("#USOS");
USOSbtn.addEventListener("click", (event) => {
  const root = ReactDOM.createRoot(document.getElementById("logowanie"));
  root.render(<Formsik data={login} />);
  document.querySelector("#USOS").disabled = true;
});
