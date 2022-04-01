const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { request } = require("express");
const saltRounds = 10;
const port = 3000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(express.json());

// connect and initialise database
const uri =
  "mongodb+srv://akhil:chat-app@cluster0.v9cds.mongodb.net/database?retryWrites=true&w=majority";
mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const chatSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  inbox: [
    {
      senderid: String,
      sendername: String,
      message: String,
      time: String,
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

// get request to get the user inbox
app.get("/:id", function (req, res) {
  Chat.findOne({ _id: req.params.id }, function (err, inbox) {
    if (inbox) {
      res.send(inbox);
    } else {
      res.send("user doesnot exist");
    }
  });
});

app.post("/sendmessage", function (req, res) {
  function sendMessage() {
    Chat.findOne(
      { _id: req.body.toid, username: req.body.toname },
      async function (err, user) {
        const newMessage = {
          senderid: req.body.fromid,
          sendername: req.body.fromname,
          message: req.body.message,
          time: req.body.time,
        };
        console.log(newMessage);
        if (user) {
          user.inbox.push(newMessage);
          await user.save();
          res.send(user);

        } else {
          res.send("user not found");
        }
      }
    );
  }

  async function handleRequest() {
    await sendMessage();

  }
  handleRequest();
});

app.post("/register", function (req, res) {
  async function saveUser(passwd) {
    const newUser = new Chat({
      username: req.body.username,
      password: passwd,
      email: req.body.email,
      inbox: [],
    });
    await newUser.save();
    Chat.findOne(
      {
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
      },
      function (err, found) {
        if (found) {
          res.send("User saved successfully!");
        } else {
          res.sned("Not able to save the user");
        }
      }
    );
  }
  bcrypt.hash(req.body.password, saltRounds, function (err, hashPasswd) {
    saveUser(hashPasswd);
  });
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});

// post request data format

// {
//     fromid: string
//     fromname: string
//     toid: string
//     toname: string
//     message: string
//     time: Number
// }
