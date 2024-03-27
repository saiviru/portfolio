"use strict";

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _dotenv = require("dotenv");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _httpProxyMiddleware = require("http-proxy-middleware");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _url = require("url");

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const app = (0, _express2.default)();

// let db=connection;
_mongoose2.default.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(`Database connected successfully`)).catch(err => console.log(err)); // app.use('/', createProxyMiddleware({ target: 'http://localhost:3011', changeOrigin: true }));


const _filename = (0, _url.fileURLToPath)(import.meta.url);

const _dirname = (0, _path.dirname)(_filename);

app.use(_express2.default.static(_dirname + '/public'));
console.log('the dir name:', _dirname); //Define a schema
// var Schema = _Schema;

const Schema = _mongoose2.default.Schema;
var SaveDetails = new Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: {
    type: Date,
    default: Date.now()
  }
});
const saveGalleryImages = new Schema({
  image: String
});
const storage = (0, _multer.memoryStorage)({
  destination: function (req, file, cb) {
    cb(null, '');
  }
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}; // defining the upload variable for the configuration of photo being uploaded


const upload = (0, _multer2.default)({
  storage: storage,
  fileFilter: filefilter
}); // var upload = multer({ storage: storage }).single('file');

const s3 = new _awsSdk2.default.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // accessKeyId that is stored in .env file
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET // secretAccessKey is also store in .env file

}); // Compile model from schema

var SaveModel = _mongoose2.default.model('SaveModel', SaveDetails);

var SaveImages = _mongoose2.default.model('SaveImages', saveGalleryImages); // now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )


app.post('/galleryImageUpload', upload.single('image'), (req, res) => {
  console.log('multer upload: ', req.file); // to check the data in the console that is being uploaded
  // Definning the params variable to uplaod the photo

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    // bucket that we made earlier
    Key: "saiviru/" + req.file.originalname,
    // Name of the image
    Body: req.file.buffer,
    // Body which will contain the image in buffer format
    ACL: "public-read-write",
    // defining the permissions to get the public link
    ContentType: "image/jpeg" // Necessary to define the image content-type to view the photo in the browser with the link

  }; // uplaoding the photo using s3 instance and saving the link in the database.

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send({
        "err": error
      }); // if we get any error while uploading error message will be returned.
    } // If not then below code will be executed


    console.log("the data:", data); // this will give the information about the object in which photo is stored 
  }); // saving the information in the database.   

  const product = new SaveImages({
    'image': req.file.originalname
  });
  product.save().then(result => {
    res.status(200).send({
      _id: result._id,
      image: req.file.originalname
    });
    console.log("inside mongo images save:", result, req.file.originalname);
  }).catch(err => {
    res.send({
      message: err
    });
  });
});
app.use(_bodyParser2.default.urlencoded({
  extended: true
})); // app.use(express.static(join(root, '/')));
// app.use('/submitDetails',()=>{
//     console.log("this is the middleware");
// })

app.get('/leads', (req, res) => {
  // res.sendStatus();
  res.sendFile(_path2.default.join(`${_dirname}/leadsContacted.html`));
});
app.get('/gallery', (req, res) => {
  res.sendFile(_path2.default.join(`${_dirname}/gallery.html`));
});
app.get('/saiviruimages', (req, res) => {
  res.sendFile(_path2.default.join(`${_dirname}/saiviruGallery.html`));
});
app.get('/galleryUpload', (req, res) => {
  res.sendFile(_path2.default.join(`${_dirname}/galleryUpload.html`));
});
app.get('/getDetails', (req, res) => {
  var theData = [];
  SaveModel.find({}).then(data => {
    data.map(now => {
      theData.push(now);
    });
    res.json(theData);
  }).catch(error => {});
});
app.get('/getImages', (req, res) => {
  let imageData = [];
  SaveImages.find({}).then(data => {
    console.log("data images from db:", data);
    data.map(one => {
      imageData.push(one);
    });
    res.json(imageData);
  });
});
app.post('/submitDetails', function (req, res) {
  let User = new SaveModel(req.body);
  User.save().then(item => {
    // req.session.message = 'details submitted'; 
    res.redirect('/');
  }).catch(error => {
    res.status(400).send("unable to save to database", error);
  });
});
app.post('/submitImages', (res, req) => {
  let Images = new SaveImages(req.body);
  Images.save().then(item => {
    res.redirect('/gallery');
  }).catch(err => {
    res.status(400).send("unable to save to database", err);
  });
});
console.log("dir name", _dirname);
app.get('/', (req, res) => {
  // res.sendStatus();
  res.sendFile(_path2.default.join(`${_dirname}/index.html`));
});
app.listen(3011);
