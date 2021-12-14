const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const userList = require("./user.json");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("hello gengs");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/chapter-3", (req, res) => {
  res.sendFile(path.join(__dirname, "public/chapter-3/index.html"));
});

app.get("/chapter-4", (req, res) => {
  res.sendFile(path.join(__dirname, "public/chapter-4/index.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.redirect("/");

  const checkusername = userList.filter((user) => {
    return username === user.username;
  });
  const checkpassword = checkusername.filter((user) => {
    return password === user.password;
  });

  if (checkpassword.length > 0) {
    return res.redirect("/");
  }
  return res.redirect("/login");
});

app.listen(port, console.log(`server is running on ${port}`));
