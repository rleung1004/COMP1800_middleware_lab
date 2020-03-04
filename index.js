const express = require('express');
const app = express();
const axios = require("axios");
const fs = require("fs").promises;

// app.use(bodyParser.urlencoded({ extended: true })) old version
app.use(express.urlencoded());
// app.use(bodyParser.json()) old ver
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  // query a database
  let drinks = [
      { name: 'Cafe Latte', sweetness: 2 },
      { name: 'Americano', sweetness: 0 },
      { name: 'Strawberry Smoothie', sweetness: 9 }
  ];
  let tagline = "Enjoy our wonderful selection of drinks";

  res.render('pages/index', {
    drinks: drinks,
    tagline: tagline
});
});

// API PRACTICE
app.get("/getData", (req, res) => {
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(function(response) {
      res.json(response.data)
    }).catch(function(error) {
      res.json("Error occured!")
    })
})

app.get("/getDataFromTextFile", (req, res) => {
  fs.readFile(__dirname + "/reminders.txt", { encoding: "utf8"}).then(function(data) {
    console.log(data)
    res.render("page/index", {reminders: data})
  })
})


// GET EXAMPLE reading from a file on disk 
app.get("/getDataFromFile", (req, res) => {
  fs.readFile(__dirname + "/test.json", { encoding: "utf8"}).then((data) => {
    obj = JSON.parse(data); // buffer to json
    res.send(JSON.stringify(obj));
  })
})

// POST EXAMPLE
 
app.post("/getUserById", (req, res) => {
  if (!req.body.id) {
    res.json("No ID found in reqest body.")
  } else {
    axios.get(`https://jsonplaceholder.typicode.com/users/${req.body.id}`)
      .then(function(response) {
        res.json(response.data)
      }).catch(function(error) {
        res.json("Error occured!")
      })
  }
})


app.listen(3000, () => console.log('app listening on port 3000!'));
