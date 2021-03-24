const express=require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const connect=require("./config/db");
const app = express();
var cors = require("cors");
const router=require("./routes/userR");
const postRouter=require("./routes/postR");
//connecting db
connect();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/",router);
app.use("/post",postRouter);

app.get('/',(req,res)=>{
    res.send("MERN blog");
});
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("app is running")
})