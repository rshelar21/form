const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const mongoose = require('mongoose');
const path = require("path")

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
// app.use(express.static("style"))
app.use(express.urlencoded())

const db = 'mongodb+srv://rss:jackOP@cluster2.yww1z.mongodb.net/formdata?retryWrites=true&w=majority'


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
}).then(() =>{
    console.log(`connecte`);
}).catch((err) => console.log(err));

// mongoose.connect('mongodb://localhost:27017/formdata', {useNewUrlParser: true, useUnifiedTopology: true});
const formSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    date: String,
    file: String,
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
    const itemName = req.body.name;
    const itemdate = req.body.date;
    const itememail = req.body.email;
    const itemphone = req.body.phone;
    const itemphoto  = req.body.file;
    const additem = new forminfo({
        name: itemName,
        date:itemdate,
        phone: itemphone,
        email: itememail,
        file: itemphoto,
    });
    additem.save().then(()=>{
        console.log("save")
        res.send("this item has been saved to the database")
    }).catch(()=>{
        // console.log("noo")
        res.status(404).send("item was not saved to the database")
    });;
   
    
})

app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`)
});