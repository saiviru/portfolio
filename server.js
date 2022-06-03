import fetch from "node-fetch";
import {config} from 'dotenv';
config();
import express from 'express';
import path,{ join,dirname } from 'path';
const app = express();
import { createProxyMiddleware } from 'http-proxy-middleware';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import multer, { memoryStorage } from 'multer';              // multer will be used to handle the form data.
import AWS from 'aws-sdk';
// let db=connection;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

app.use('/', createProxyMiddleware({ target: 'http://localhost:3011', changeOrigin: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'));
console.log('the dir name:',__dirname);
//Define a schema
// var Schema = _Schema;
const Schema = mongoose.Schema;

var SaveDetails = new Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now() }
});

const saveGalleryImages = new Schema({
    image:String
});

const storage = memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage,fileFilter:filefilter });
// var upload = multer({ storage: storage }).single('file');


const s3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})

// Compile model from schema
var SaveModel = mongoose.model('SaveModel', SaveDetails );
var SaveImages = mongoose.model('SaveImages',saveGalleryImages);

// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
app.post('/galleryImageUpload', upload.single('image'), (req, res) => {
    console.log('multer upload: ',req.file)  // to check the data in the console that is being uploaded
  
    // Definning the params variable to uplaod the photo
    
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key:"saiviru/"+req.file.originalname,               // Name of the image
        Body:req.file.buffer,                    // Body which will contain the image in buffer format
        ACL:"public-read-write",                 // defining the permissions to get the public link
        ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };
  
   // uplaoding the photo using s3 instance and saving the link in the database.
    
    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }
  
   // If not then below code will be executed
        
    console.log("the data:",data)                      // this will give the information about the object in which photo is stored 
    });

    // saving the information in the database.   
    const product = new SaveImages({'image': req.file.originalname});
        product.save()
            .then(result => {
                res.status(200).send({
                    _id: result._id,
                    image: req.file.originalname,
                })
                console.log("inside mongo images save:",result,req.file.originalname);
            })
            .catch(err => {
                res.send({ message: err })
          })
});


app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(join(root, '/')));

// app.use('/submitDetails',()=>{
//     console.log("this is the middleware");
// })

app.get('/leads',(req,res)=>{
    // res.sendStatus();
    res.sendFile(path.join(`${__dirname}/leadsContacted.html`));
});

app.get('/gallery',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/gallery.html`));
});

app.get('/galleryUpload',(req,res)=>{
    res.sendFile(path.join(`${__dirname}/galleryUpload.html`));
});

app.get('/getDetails',(req, res)=>{
    var theData=[];
    SaveModel.find({})
    .then((data)=>{
        data.map((now)=>{
            theData.push(now);
        })
        res.json(theData);
    })
    .catch(error=>{
        
    })
});

app.get('/getImages',(req,res)=>{
    let imageData=[];
    SaveImages.find({})
    .then((data)=>{
        console.log("data images from db:",data)
        data.map((one)=>{
            imageData.push(one);
        })
    res.json(imageData);
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
  });

app.post('/submitImages',(res,req)=>{
    let Images=new SaveImages(req.body);
    Images.save()
    .then(item=>{
        res.redirect('/gallery');
    })
    .catch(err=>{
        res.status(400).send("unable to save to database",err);
    })
})
console.log("dir name",__dirname);
app.get('/',(req,res)=>{
    // res.sendStatus();
    res.sendFile(path.join(`${__dirname}/index.html`));
});

app.listen(3011);