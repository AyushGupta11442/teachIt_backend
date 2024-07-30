const express = require('express');
const mongoose = require('mongoose')
const authRouter = require("./routes/auth");
const env = require(env)


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(authRouter);


const DB = "mongodb+srv://saranshcrazysaxena:<password>@cluster0.sb5jks4.mongodb.net/";

mongoose.connect(DB).then(()=>{
    console.log("connection sucessfull");
}).catch((e)=>{
    console.log(e);
});

app.listen(PORT, "0.0.0.0" , ()=>{
    console.log(`connected at port ${PORT}`);
});