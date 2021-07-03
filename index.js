const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const server = require("http").createServer(app);
const cors = require("cors");

const PORT = process.env.PORT || 5005;
const io = require("socket.io")(server, {
  cors: {
    credentials: true,
    origin: "*",
    method: ["GET", "POST"],
  },
});

// Create your views here.
const account = [
  {
    username: "admin",
    password: "admin",
  },
  {
    username: "user1",
    password: "user1",
  },
  {
    username: "user2",
    password: "user2",
  },
  {
    username: "user3",
    password: "user3",
  },
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
  // res.sendFile(__dirname + "/clien-chat-video/build/index.html");
});

// api
app.use(bodyParser.json());

app.post("/api", (req, res) => {
  try {
    var username = req.body.username;
    var password = req.body.password;

    for (let id = 0; id < account.length; id++) {
      if (account[id].username == username) {
        if (account[id].password == password) {
          res.status(200).json({ message: "ok" });
        } else {
          res.status(401).json({ message: "incorrect pass" });
        }
      }
    }
    res.status(403).json({ message: "not found account" });
  } catch (error) {
    res.status(400).json({ message: "bad request" });
  }
});

app.post("/api/getFullAcc", (req, res) => {
  try {
    var username = req.body.username;
    let temp = account.filter((item) => {
      return item.username != username;
    });
    res.json(temp);
  } catch (err) {
    res.status(400).json({ message: "bad request" });
  }
});

// server.listen(PORT, () => console.log("server is running on ", PORT));
server.listen(PORT);

// socket.io
var array_user = [];

io.on("connection", (socket) => {
  socket.on("user_connected", (data) => {
    let tuple = {
      username: data["userLogIn"],
      peer_id: data["peer_id"],
      socket_id: socket.id,
    };

    if (array_user.length > 0) {
      array_user.forEach((element) => {
        if (element["username"] == tuple["username"]) {
          let id = array_user.indexOf(element);
          array_user.splice(id, 1);
        }
      });
    }

    array_user.push(tuple);
    // console.log("total users:", array_user);
  });

  // socket.on("get_user", () => {
  //   console.log(array_user);
  // socket.emit("res_user", { users: array_user });
  // });

  socket.on("disconnect", () => {
    // remove element
    array_user.forEach((element) => {
      if (element["socket_id"] == socket.id) {
        let id = array_user.indexOf(element);
        array_user.splice(id, 1);
      }
    });
  });

  socket.on("callUser", (data) => {
    let socketid = findSocketId(data["to"]);

    if (socketid) {
      io.to(socketid["socket_id"]).emit("calling", data["from"]);
    } else {
      io.to(socket.id).emit("notFound", {
        response: "Not found or not online",
      });
    }
  });

  socket.on("answerCall", (data) => {
    let socketid = findSocketId(data["to"]);

    if (data["accept"]) {
      let socketIdFrom = findSocketId(data["from"]);
      io.to(socketid["socket_id"]).emit("callAccepted", {
        accept: data["accept"],
        peer_id: socketIdFrom["peer_id"],
      });
    } else {
      io.to(socketid["socket_id"]).emit("callAccepted", {
        accept: data["accept"],
      });
    }
  });

  socket.on("leaveCall", (data) => {
    let socketid = findSocketId(data["to"]);
    io.to(socketid["socket_id"]).emit("endCall", { endCall: true });
  });
});

const findSocketId = (some) => {
  let socketid;
  array_user.forEach((element) => {
    if (element["username"] == some) {
      socketid = element;
    }
  });
  return socketid;
};

// https://chat-video-react-v1.herokuapp.com/
