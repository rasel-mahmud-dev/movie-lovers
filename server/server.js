const Koa = require('koa');
const koaRouter = require('koa-router')// importing Koa-Router
const serve = require("koa-static");
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const routes  = require('./routes');
const { default: mongoose } = require('mongoose');

require("dotenv").config()


const app = new Koa();
const router = new koaRouter()

app.use(bodyParser());

app.use(cors());

// serve public dir as static files
app.use(serve(__dirname + "/public"));

//  logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});


// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes())
    .use(router.allowedMethods())// registering routes to the application
  

// response
router.get('home', '/', (context) => {
    context.body = "Welcome to my Koa.js Server"
})
  
// response
router.get('', '/home', (context) => {

    context.body = "Welcomasdsade to my Koa.js Server"
})
  

// initialize all routes
routes(router)



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