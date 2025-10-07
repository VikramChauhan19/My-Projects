const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json()); //Lets the server read JSON data sent from clients (like API requests).
app.use(express.urlencoded({extended:true})); //Lets the server read form data (like from HTML forms).
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/read', async (req,res)=>{
    let allUsers =await userModel.find();

    res.render('read',{users:allUsers});
})
app.get('/edit/:id', async (req,res)=>{
    let person =await userModel.findOne({_id:req.params.id});

    res.render('edit',{person});
})
app.get('/delete/:id', async (req,res)=>{
    let allUsers =await userModel.findOneAndDelete({_id:req.params.id});

    res.redirect("/read");
})
app.post('/update/:id',async (req,res)=>{
    let {name,image,email} = req.body;
    const createdUser = await userModel.findOneAndUpdate({_id:req.params.id},{name,image,email},{new:true});
    res.redirect("/read");
   
})
app.post('/create',async (req,res)=>{
    const createdUser = await userModel.create({
        name:req.body.name,
        email:req.body.email,
        image:req.body.imageurl
    })
    res.redirect("/read");
   
})

app.listen(3000);




