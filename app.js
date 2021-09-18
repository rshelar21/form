const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const mongoose = require('mongoose');
const path = require("path")

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
// app.use(express.static("style"))
app.use(express.urlencoded())

// const DB = 'mongodb+srv://jackk:jackOP123@cluster1.ibtrp.mongodb.net/formdata?retryWrites=true&w=majority'

// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
   
// }).then(() =>{
//     console.log(`connecte`);
// }).catch((err) => console.log(`no`));

mongoose.connect('mongodb://localhost:27017/formdata', {useNewUrlParser: true, useUnifiedTopology: true});
const formSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    date: String,
    // file: String,
});
var forminfo = mongoose.model('form', formSchema);

app.get('/', (req, res)=>{
    res.render("index.pug");
})
app.post('/', (req, res)=>{
    var myDData = new forminfo(req.body);
    myDData.save().then(()=>{
        console.log("save")
        res.send("this item has been saved to the database")
    }).catch(()=>{
        // console.log("noo")
        res.status(404).send("item was not saved to the database")
    });
    // res.render("index.pug");
})

app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`)
});