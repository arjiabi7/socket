import express from "express"; // Import Express untuk membuat aplikasi/server HTTP
import { createServer } from "http"; // Import createServer dari Node.js untuk membuat HTTP server
import { Server } from "socket.io"; // Import Server dari Socket.IO untuk membuat Socket.IO server
import cors from "cors"; // Import CORS agar frontend dari origin berbeda dapat terhubung

const app = express(); // Membuat instance aplikasi Express

app.use(cors()); // Mengaktifkan middleware CORS pada Express

const httpServer = createServer(app); // Membuat HTTP server menggunakan aplikasi Express

// Membuat Socket.IO server dan memasangnya pada HTTP server
const io = new Server(httpServer, {
  cors: { // Konfigurasi CORS khusus untuk Socket.IO
    origin: "*", // Mengizinkan koneksi dari semua origin
  },
});

// Menunggu ketika ada client yang berhasil terhubung ke Socket.IO
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Menunggu ketika client mengirim event bernama "message" atau Menerima event dari client
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // Mengirim event "message" beserta datanya ke semua client yang terhubung
    io.emit("message", data);
  });

  // Menunggu ketika client terputus dari Socket.IO server
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Menjalankan HTTP dan Socket.IO server pada port 3001
httpServer.listen(3001, () => {
  console.log("Socket server running on port 3001");
});