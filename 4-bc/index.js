const express= require("express")
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); //all static filess in public
app.set('view engine', 'ejs'); 

app.get("/",function(req,res){
    res.render("index.ejs");
})


app.listen(3000,function(){
    console.log("its running");
})