require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
let db=mongoose.connection;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', ()=>{console.log('MongoDB connection error:')});
db.once('connected',()=>console.log("connectedto db"));

//Define a schema
var Schema = mongoose.Schema;

var SaveDetails = new Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now() }
});

// Compile model from schema
var SaveModel = mongoose.model('SaveModel', SaveDetails );


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));

// app.use('/submitDetails',()=>{
//     console.log("this is the middleware");
// })

app.get('/leads',(req,res)=>{
    // res.sendStatus();
    res.sendFile(path.join(`${__dirname}/leadsContacted.html`));
});

app.get('/getDetails',(req, res)=>{
    SaveModel.find({})
    .then((data)=>{
        res.json(data);
    })
    .catch(error=>{
        
    })
})


app.post('/submitDetails', function (req, res) {
    let User=new SaveModel(req.body);
    User.save()
    .then(item=>{
        // req.session.message = 'details submitted'; 
        res.redirect('/');
    })
    .catch(error=>{
        res.status(400).send("unable to save to database",error);
    })
  })

app.get('/',(req,res)=>{
    // res.sendStatus();
    res.sendFile(path.join(`${__dirname}/index.html`));
});





app.listen(3011);