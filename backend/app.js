const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const saltRounds = 10;
const port = 4000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,POST,PATCH,DELETE',
      credentials: true
  })
)
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
      id: String,
      message: String,
      sent:Boolean
    }
  ]
});

const Chat = mongoose.model("Chat", chatSchema);

// get request to get the user inbox
app.get("/", function (req, res) {
  Chat.find({}, { _id: 1, username: 1 }, function (err, inbox) {
    if (inbox) {
      res.send(inbox);
    } else {
      res.send(err);
    }
  });
});

app.get("/:id", function (req, res) {
  Chat.findOne({ _id: req.params.id },{password:0,email:0}, function (err, inbox) {
    if (inbox) {
      res.send(inbox);
    } else {
      res.send(err);
    }
  });
});

app.post("/sendmessage", function (req, res) {
  function sendMessage() {
  
    Chat.findOne(
      { _id: req.body.toid},
      async function (err, user) {
        const newMessage = {
          id: req.body.fromid,
          message: req.body.message,
          sent: false
        };
        console.log(newMessage);
        if (user) {
          user.inbox.push(newMessage);
          await user.save();
        } else {
          console.log(err);
        }
      }
    );
    Chat.findOne(
      { _id: req.body.fromid},
      async function (err, user) {
        const newMessage = {
          id: req.body.toid,
          message: req.body.message,
          sent:true
        };
        console.log(newMessage);
        if (user) {
          user.inbox.push(newMessage);
          await user.save();

        } else {
          console.log(err);
        }
      }
    );
  }
  
  async function handleRequest() {
    await sendMessage();
    res.send("done");
  }
  handleRequest();
});
app.post("/login", function (req, res) {
  Chat.findOne(
    {
      username: req.body.username,
    },
    function (err, user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, found) {
          if (found) {
            res.send("YAY");
          } else {
            res.send("ded");
          }
        });
      } else {
        res.send("ded");
      }
    }
  );
});
app.post("/register", function (req, res) {
  function saveUser(passwd) {
    Chat.findOne({ username: req.body.username }, async function (err, found) {
      if (found) {
        res.send("username already exists");
      } else {
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
              res.send("Error");
            }
          }
        );
      }
    });
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
