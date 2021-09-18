const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookiesMiddleware = require("universal-cookie-express");

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
app.use(cookiesMiddleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
  // res.send("Run from index.js of server nodejs");
  res.sendFile(__dirname + "/build/index.html");
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
var array_user_chat = [];
var array_user = [];

// app.get("/get/user", (req, res) => {
//   res.json(array_user);
// });

io.on("connection", (socket) => {
  socket.on("user_connected_chat", (data) => {
    let tuple = {
      username: data["userLogIn"],
      socket_id: socket.id,
    };

    io.emit("updateUser_chat", updateUser(array_user_chat, tuple));
  });

  socket.on("sendMess", (data) => {
    let socketid = findSocketId(array_user_chat, data["to"]);
    io.to(socketid["socket_id"]).emit("receiveMess", data);
  });

  socket.on("sendFile", (data) => {
    let socketid = findSocketId(array_user_chat, data["to"]);
    io.to(socketid["socket_id"]).emit("receiveFile", data);
  });

  socket.on("sendAudio", (data) => {
    let socketid = findSocketId(array_user_chat, data["to"]);
    io.to(socketid["socket_id"]).emit("receiveAudio", data);
  });

  socket.on("user_connected", (data) => {
    let tuple = {
      username: data["userLogIn"],
      peer_id: data["peer_id"],
      socket_id: socket.id,
    };

    io.emit("updateUser", updateUser(array_user, tuple));
  });

  // socket.on("get_user", () => {
  //   console.log(array_user);
  // socket.emit("res_user", { users: array_user });
  // });

  socket.on("endSession", () => {
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    // remove element
    array_user = removeUser(array_user, socket.id);
    io.emit("updateUser", array_user);

    array_user_chat = removeUser(array_user_chat, socket.id);
    io.emit("updateUser_chat", array_user_chat);
  });

  socket.on("callUser", (data) => {
    let socketid = findSocketId(array_user, data["to"]);

    if (socketid) {
      io.to(socketid["socket_id"]).emit("calling", data["from"]);
    } else {
      io.to(socket.id).emit("notFound", {
        response: "Not found or not online",
      });
    }
  });

  socket.on("answerCall", (data) => {
    let socketid = findSocketId(array_user, data["to"]);

    if (data["accept"]) {
      let socketIdFrom = findSocketId(array_user, data["from"]);
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
    let socketid = findSocketId(array_user, data["to"]);
    io.to(socketid["socket_id"]).emit("endCall", { endCall: true });
  });
});

const removeUser = (array, socket_id) => {
  array.forEach((element) => {
    if (element["socket_id"] == socket_id) {
      let id = array.indexOf(element);
      array.splice(id, 1);
    }
  });

  return array;
};

const findSocketId = (array_user, some) => {
  let socketid;
  array_user.forEach((element) => {
    if (element["username"] == some) {
      socketid = element;
    }
  });
  return socketid;
};

const updateUser = (array, tuple) => {
  if (array.length > 0) {
    array.forEach((element) => {
      if (element["username"] == tuple["username"]) {
        let id = array.indexOf(element);
        array.splice(id, 1);
      }
    });
  }

  array.push(tuple);
  return array;
};

// https://chat-video-react-v1.herokuapp.com/
