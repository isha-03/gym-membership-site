const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();//created express app
const port=80;

//for serving static files
app.use('/static',express.static('static'))//'static' is the folder name and '/static' is url
//localhost/static/index.js type this in browser we will see js in index.js
app.use(express.urlencoded())//this middleware helps to get data from toform to express

//pug specific stuff
app.set('view engine', 'pug')//set the template engine for pug
app.set('views',path.join(__dirname,'views'));//set the view directory

//endpoint
app.get("/",(req,res)=>{
    const con="this is the best content on the internet so far"
    const params={'title':'gym website','content':con}
    res.status(200).render('index.pug',params);
});
//post request to save data of form in the file
app.post("/",(req,res)=>{
    name=req.body.name
    age=req.body.age
    gender=req.body.gender
    adress=req.body.adress
    more=req.body.more
    let outputToWrite=`the name of the client is ${name}, ${age} years old, ${gender}, residing at ${adress}. More about client: ${more}`
    fs.writeFileSync('output.txt',outputToWrite)
    const params={'message':'your form has been submitted successfully'}
    res.status(200).render('index.pug',params);
})
//start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
})

