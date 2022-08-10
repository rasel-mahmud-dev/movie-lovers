const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =  require("mongoose");
require("dotenv").config()


const app = express();
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan("dev"));

// serve public dir as static files
app.use(express.static((__dirname + "/public")))


let referrer_domain = process.env.FRONTEND


// disable access outside of our app
app.all('/*', function(req, res, next) {
    if(req.headers.referer){
        if(req.headers.referer.indexOf(referrer_domain) == -1){
            res.send('Invalid Request')
        } else {
             next();
        }

    } else{
        res.status(500).send('Access error')
    }
});


const whitelist = [process.env.FRONTEND]
const corsOptions = {
	credentials: true,
	origin: function (origin, callback) {

    if(whitelist.indexOf(origin) !== -1) {
        callback(null, true)
        
    } else 
        // no access
        callback(null, false)
    }
}

app.use(cors(corsOptions))

app.get("/", (req, res)=>{
    res.send("Netflix2.0 api server")
})

const routes  = require('./routes');
routes(app)


mongoose.connect(process.env.NODE_ENV === "development" 
    ? "mongodb://127.0.0.1:27017/netflix" 
    : process.env.MONGODB_URL
).then(()=>{
    console.log("mongodb connected...");
})
.catch(err=>{
    console.log(err);
})


const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));