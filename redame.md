# 🏢 SuperCondominio – Gestione Condominiale Angular + Express

Benvenuto nel progetto **SuperCondominio**, un'applicazione full-stack sviluppata con ❤️ usando **Angular 20** e **Express**.

🎯 **Obiettivo**: Fornire agli **amministratori** e agli **utenti residenti** uno strumento digitale semplice ma potente per gestire:
- Post e annunci
- Bollette e spese
- Richieste e ticket tra utenti e amministratore

> Realizzato con un tocco di follia e un sacco di caffeina ☕  
> **Made by Marco Ienna**

---

## ⚙️ Funzionalità

### 👤 Utente
- ✅ Visualizza i post pubblicati dall'amministratore
- ✅ Consulta e scarica le bollette (immagini)
- ✅ Invia richieste/ticket direttamente dal sito

### 👑 Amministratore
- ✅ Crea e cancella post dinamici (in tempo reale)
- ✅ Carica bollette e le gestisce (upload + delete)
- ✅ Visualizza tutti i ticket degli utenti in tabella
- ✅ Può aprire e cancellare i ticket uno ad uno

---

## 🧠 Tecnologie usate

- **Frontend**: Angular 20, Signal, @for/@if, CSS custom
- **Backend**: Express + Node.js
- **Storage dati**: file `.json` (simulazione DB)
- **Sicurezza API**: `x-api-key` per le rotte sensibili
- **Upload immagini**: `multer` + gestione file statici
- **Gestione ruoli**: `user` vs `admin` con viste dedicate

---

## 🚀 Come avviare il progetto

Clona il progetto e poi:

### 🔧 Backend (Express)

```bash
cd backend
npm install
npm start
Server Express sarà su http://localhost:3000


FRONTEND ANGULAR
cd frontend
npm install
ng serve
App Angular su http://localhost:4200



🧙🏻‍♂️ Autore
Realizzato da Marco Ienna, con l’obiettivo di trasformare una passione in professione.
Spoiler: ci sto riuscendo.



//eng

🏢 SuperCondominio – Angular + Express Condo Management App
Welcome to SuperCondominio, a full-stack app built with ❤️ using Angular 20 and Express.

🎯 Goal: Provide administrators and residents with a modern platform to manage:

Posts and announcements

Bills and expenses

Requests and ticketing system

Built with a touch of madness and lots of caffeine ☕
Created by Marco Ienna


⚙️ Features
👤 User
✅ See announcements posted by the admin

✅ View and download bills (as images)

✅ Submit tickets to the administrator

👑 Admin
✅ Create and delete posts dynamically (real time)

✅ Upload and delete bills (image files)

✅ View all user tickets in a responsive table

✅ Open and delete individual tickets




🧠 Tech Stack
Frontend: Angular 20, Signal, @for/@if, Custom CSS

Backend: Node.js + Express

Data storage: JSON file (mock database)

API protection: x-api-key on critical routes

Image upload: multer + static file serving

Role-based views: user vs admin access

🚀 How to run locally
Clone the project and run:
cd backend
npm install
npm start
Server runs on http://localhost:3000

//FRONTEND angular
cd frontend
npm install
ng serve


🧙🏻‍♂️ Author
Created by Marco Ienna, working hard to turn passion into a career.
Spoiler: it's working.