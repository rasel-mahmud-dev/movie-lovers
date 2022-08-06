const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes  = require('./routes');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');

require("dotenv").config()


const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// serve public dir as static files
app.use(express.static((__dirname + "/public")))



// initialize all routes
routes(app)


const PORT = process.env.PORT || 3000

mongoose.connect("mongodb://127.0.0.1:27017/netflix")
.then(()=>{
    console.log("mongodb connected...");
})
.catch(err=>{
    console.log(err);
})





app.listen(PORT, ()=>{
    console.log("server is runnin on port " + PORT);
});