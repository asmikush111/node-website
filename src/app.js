require('./db/conn');
const path=require('path');
const express=require('express');
const app=express();
const hbs=require('hbs');
const User=require('./models/usermessage');
const port=process.env.PORT || 8000;

const staticpath=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials');

app.use(express.urlencoded({extended:false}))
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')));
app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')));
app.use(express.static(staticpath));

app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialspath);

app.get("/",(req,res)=>{
    res.render('index');
})

app.post("/contact",async (req,res)=>{
   try{
    const data=new User(req.body);
    await data.save();
    res.status(201).render('index');
   }
   catch(e){
    res.status(500).send(e);
   }
})

app.listen(port);