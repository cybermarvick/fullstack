const usermodel = require("../Model/userModel")
const bcrypt = require("bcryptjs")


const Signup = async (req, res) =>{
    // res.send("Welcome to signup")
    console.log(req.body);
    try {
        const{firstname, lastname, email, password} =req.body
        if (!firstname || !lastname || !email || !password) {
            res.status(400).send({message:"input field cannot be empty", status:false})
        }else{
          const existuser = await  usermodel.findOne({email:email})
          if (existuser) {
            res.status(402).send({message:"user already exist", status:false})
          }else{
          const hashpassword = await bcrypt.hash(password, 10)
               console.log(hashpassword);
           const newuser = await usermodel.create({firstname, lastname, email,password:hashpassword})
           if (newuser) {
            return res.status(200).send({message:"signup successful", status:true})
           }
          }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message, status:false})
    }
}


const Loginuser = async (req, res) =>{
  const {email , password} = req.body
    if (!email || !password ) {
      res.status(400).send({message:"input field cannot be empty", status:false})
    }else{
      try {
       const user = await usermodel.findOne({email:email})
       console.log(user);
       if (!user) {
        res.status(402).send({message:"You are not a registered user; please sign up", status:false})
       }else{
       const correctpassword = await bcrypt.compare(password, user.password)
       if (!correctpassword) {
        res.status(405).send({message:"Incorrect password", status:false})
       }else{
        return res.status(200).send({message:"login successful", status:true})
       }
       }
      } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message, status:false})
      }
    }
}



module.exports ={Signup, Loginuser }