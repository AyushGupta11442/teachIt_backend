const express = require("express");
const bcrypt = require("bcryptjs");
// const user = require("../model/user");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const authRouter = express.Router();


//signup

authRouter.post("/api/signup", async(req, res)=>{
    try {
        const {name, email, password}=req.body;

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg: "user with same email already exists!"});                        //400 show bad req
        }

        const hashPassword = await bcrypt.hash(password, 8);
        let user= new User({
            email,
            password: hashPassword,
            name,
        });
        user= await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

//signIN
authRouter.post("api/signin",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await user.findOne({email});
        if(!user){
            return res.status(400).json({msg:"user with an email does not exist!"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Incorrect Password!"});                                    
        }

        const token=jwt.signin({id:user._id},"passwordKey");                    //used for storing data in local storage , work as a middleware, used in aunthentication in chatapp
        signup
        res.json({token ,...user._doc});                                   //it will only imp data not all data, if we want all data we should write only user

    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

//token verification
authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  // get user data
  authRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  });

module.exports=authRouter;