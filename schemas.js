const mongoose = require('mongoose')

const expenseSchema=new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type:String
    },
    date:{
        type:String
    }
},{versionKey:false});
const Expences = mongoose.model('expenseDetails',expenseSchema);
 
const userdetailSchema =new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{versionKey:false});
const User = mongoose.model('userDetails',userdetailSchema);

module.exports = {Expences,User}
