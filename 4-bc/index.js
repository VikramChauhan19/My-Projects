const express= require("express")
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); //all static filess in public
app.set('view engine', 'ejs'); 

app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/profile/:username",function(req,res){  //: se dynamic ho jayega mtlb iske jagah kuch bhi aa skta he
    
    res.send(`Welcome, ${req.params.username}`);
});

app.get("/profile/:username/:age",function(req,res){
    res.send(`Welcome, ${req.params.username} of age ${req.params.age}`)
})


app.listen(3000,function(){
    console.log("its running");
})