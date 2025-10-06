const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json()); //Lets the server read JSON data sent from clients (like API requests).
app.use(express.urlencoded({extended:true})); //Lets the server read form data (like from HTML forms).
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/read',(req,res)=>{
    res.render('read');
})

app.listen(3000);