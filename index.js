const express = require("express");
const app = express();

const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    credentials: true,
    origin: "*",
    method: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5005;

app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

io.on("connection", (socket) => {
  socket.emit("conn", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log("server is running on ", PORT));

// https://chat-video-react-v1.herokuapp.com/
