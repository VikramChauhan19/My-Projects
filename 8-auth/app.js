const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const userModel = require("./models/user.js"); // model aa gya he userModel me
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



app.set("view engine","ejs");
app.use(express.json()); // for json
app.use(express.urlencoded({extended:true})); //for file
app.use(express.static(path.join(__dirname,'public')));  
app.use(cookieParser()); //for cookie


app.get('/',(req , res)=>{
    res.render('index');
})

app.get("/login", (req, res) => {
  res.render("login"); // assuming you have login.ejs in 'views' folder
});
//create
app.post('/create',async (req , res)=>{

    const salt = await bcrypt.genSalt(10);

        // 2. Hash password with salt
    const hashP = await bcrypt.hash(req.body.password, salt);
    
    let userEntry = await userModel.create({   //create ker dega entry
        username:req.body.username,
        email:req.body.email,
        password:hashP,
        age:req.body.age
    })

    let token = jwt.sign({email:req.body.email},"shhhhhhh");  //digital id card
    res.cookie("token",token) //cookie me save ker diya

    res.send(userEntry);
})

app.post("/login", async(req ,res)=>{
    let user = await userModel.findOne({email:req.body.email}); //check email
    if(!user) return res.send("something is wrong");  //ager fail hua toa

    bcrypt.compare(req.body.password,user.password,(err,result)=>{  //pass ko hash pass se compare karenge
        if(result){
            let token = jwt.sign({email:req.body.email},"shhhhhhh");  //digital id card
            res.cookie("token",token) //cookie me save ker diya
            res.send("yes you can login")
        } 
        else res.send("no you cant login")
    });

    


});

app.post("/logout",function(req,res){
    res.cookie("token",""); //token ki value hata di
    res.redirect("/");
})

app.listen(3000);