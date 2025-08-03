const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const bcrypt = require("bcrypt");
const API_KEY = "$2a$12$1.A9iORrDntT8lu.JHGPT.2/pByjWQAA7KACETTUZs/3t1NgtKzMi";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images", "bollette"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

//inizializzo app
const app = express();
const PORT = 3000;

//qui middleware
app.use(cors());
app.use(express.json());

//funzione protezione DB
function checkApiKey(req, res, next) {
  const key = req.headers["x-api-key"];

  if (key !== API_KEY) {
    return res
      .status(403)
      .json({ error: "Accesso negato: API key non valida" });
  }
  next();
}

//-------------------------------------------------------------------------------------

//get /posts - restituisce tutti i post
app.get("/posts", (req, res) => {
  const postsPath = path.join(__dirname, "data", "posts.json");
  const rawData = fs.readFileSync(postsPath, "utf-8");
  const posts = JSON.parse(rawData);
  res.json(posts);
});

//POST /posts crea un nuovo post
app.post("/posts", checkApiKey, (req, res) => {
  const postsPath = path.join(__dirname, "data", "posts.json");

  const rawData = fs.readFileSync(postsPath, "utf-8");
  const posts = JSON.parse(rawData);

  const newPost = {
    id: crypto.randomUUID(),
    title: req.body.title || "Untitled",
    content: req.body.content || "",
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  res.status(201).json(newPost);
});

//POST DELETE - per deletare i post
app.delete("/posts/:id", checkApiKey, (req, res) => {
  const postId = req.params.id;
  const postsPath = path.join(__dirname, "data", "posts.json");

  const rawData = fs.readFileSync(postsPath, "utf-8");
  let posts = JSON.parse(rawData);

  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post non trovato" });
  }

  posts.splice(postIndex, 1);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

  res.status(204).send();
});

//-------------------------------------------------------------------------------------

//Get USERS - restituisce tutti gli utenti
app.get("/users", (req, res) => {
  const usersPath = path.join(__dirname, "data", "users.json");

  fs.readFile(usersPath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore nella Lettura degli Utenti!" });
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

//post Users  registra un nuovo utente
app.post("/users", (req, res) => {
  const usersPath = path.join(__dirname, "data", "users.json");
  const rawData = fs.readFileSync(usersPath, "utf-8");
  const users = JSON.parse(rawData);
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const newUser = {
    id: crypto.randomUUID(),
    name: req.body.name,
    subname: req.body.subname,
    email: req.body.email,
    password: hashedPassword,
    villetta: req.body.villetta,
    role: "user",
  };
  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res
    .status(201)
    .json({ message: "Utente registrato con successo", user: newUser });
});

//LOGIN - autenticazione Utente tramite email e pwd
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const usersPath = path.join(__dirname, "data", "users.json");
  const rawData = fs.readFileSync(usersPath, "utf-8");
  const users = JSON.parse(rawData);

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Email non trovata" });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "password errata" });
  }

  const userResponse = {
    id: user.id,
    name: user.name,
    subname: user.subname,
    email: user.email,
    villetta: user.villetta,
    role: user.role,
  };

  res.json(userResponse);
});

//-------------------------------------------------------------------------------------

//post immagini bollette
app.post(
  "/upload-bollette",
  checkApiKey,
  upload.single("bolletta"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Nessun File RICEVUTO!" });
    }
    const fileUrl = `http://localhost:${PORT}/images/bollette/${req.file.filename}`;
    const bollettePath = path.join(__dirname, "data", "bollette.json");
    const rawData = fs.readFileSync(bollettePath, "utf-8");
    const bollette = JSON.parse(rawData);

    const newBolletta = {
      id: crypto.randomUUID(),
      title: req.body.title || "Senza Titolo",
      url: fileUrl,
      createdAt: new Date().toISOString(),
    };
    bollette.push(newBolletta);
    fs.writeFileSync(bollettePath, JSON.stringify(bollette, null, 2));
    res.status(201).json({ message: "Upload riuscito", bolletta: newBolletta });
  }
);

//GET immagini bollette
app.get("/bollette", (req, res) => {
  const bollettePath = path.join(__dirname, "data", "bollette.json");

  fs.readFile(bollettePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore nella lettura di bollette.json" });
    }

    const bollette = JSON.parse(data);
    res.json(bollette);
  });
});

//DELETE /bollette/:id - cancella bolletta e immagine
app.delete("/bollette/:id", checkApiKey, (req, res) => {
  const bollettePath = path.join(__dirname, "data", "bollette.json");
  const rawData = fs.readFileSync(bollettePath, "utf-8");
  let bollette = JSON.parse(rawData);

  const bollettaId = req.params.id;
  const bollettaToDelete = bollette.find((b) => b.id === bollettaId);

  if (!bollettaToDelete) {
    return res.status(404).json({ error: "Bolletta non trovata" });
  }

  //rimuovo immagine fisicamente:
  const fileName = path.basename(bollettaToDelete.url);
  const filePath = path.join(__dirname, "images", "bollette", fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  //rimozione bolletta dal file JSON
  bollette = bollette.filter((b) => b.id !== bollettaId);
  fs.writeFileSync(bollettePath, JSON.stringify(bollette, null, 2));
  res.status(204).send();
});

//-------------------------------------------------------------------------------------

//POST TICKET - crea un nuovo ticket
app.post("/requests", (req, res) => {
  const requestPath = path.join(__dirname, "data", "request.json");
  const rawData = fs.readFileSync(requestPath, "utf-8");
  const requests = JSON.parse(rawData);

  const newRequest = {
    id: crypto.randomUUID(),
    userId: req.body.userId,
    object: req.body.object || "Senza Oggetto",
    nomeUtente: req.body.nomeUtente,
    content: req.body.content || "",
    createdAt: new Date().toISOString(),
  };

  requests.push(newRequest);
  fs.writeFileSync(requestPath, JSON.stringify(requests, null, 2));

  res
    .status(201)
    .json({ message: "Ticket creato con successo", ticket: newRequest });
});

//Get Ticket - restitutisce tutti i ticket
app.get("/requests",
  (req, res) => {
    const requestPath = path.join(__dirname, "data", "request.json");

    fs.readFile(requestPath, "utf-8", (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Errore nella lettura dei ticket" });
      }

      const requests = JSON.parse(data);
      res.json(requests);
    });
  });

  //Delete Ticket - cancella un ticket
  app.delete("/requests/:id", checkApiKey, (req, res) => {
    const requestPath = path.join(__dirname, "data", "request.json");
    const rawData = fs.readFileSync(requestPath, "utf-8");
    let requests = JSON.parse(rawData); 

    const idToDelete = req.params.id;
    const index = requests.findIndex((t) => t.id === idToDelete);

    if (index === -1) {
      return res.status(404).json({ error: "Ticket non trovato"});
      
    }
    requests.splice(index, 1);
    fs.writeFileSync(requestPath, JSON.stringify(requests, null, 2));

    res.status(204).send();


  })

//-------------------------------------------------------------------------------------

//percorso statico per le immagini
app.use("/images", express.static(path.join(__dirname, "images")));

//Crea la cartella images/bollette solo se non esiste!
const bolletteDir = path.join(__dirname, "images", "bollette");
if (!fs.existsSync(bolletteDir)) {
  fs.mkdirSync(bolletteDir, { recursive: true });
  console.log("Cartella bollette creata");
}

//avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
