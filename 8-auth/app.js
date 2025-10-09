const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");



app.set("view engine","ejs");
app.use(express.json()); // for json
app.use(express.urlencoded({extended:true})); //for file
app.use(express.static(path.join(__dirname,'public')));  
app.use(cookieParser()); //for cookie


app.get('/',(req , res)=>{
    res.render('index');

})

app.listen(3000);