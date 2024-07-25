const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userschema = mongoose.Schema({
    firstname: { type: String, required:true},
    lastname: { type: String, required:true},
    email: { type: String, Unique:true, required:true},
    password: { type: String, required:true},
},{timestamps: true})

 let saltRound = 10
//  userschema.pre("save", function(next) {
//     console.log(this, "line 11");

//     bcrypt.hash(this.password, saltRound).then((password)=>{
//         console.log(password);
//         this.password = password
//         next()
//     }).catch((err)=>{
//         console.log(err);
//     })

//  })

const usermodel = mongoose.model("user_collection", userschema)


module.exports = usermodel