const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paySchema = new Schema({
    pID:{
        type:Number,
        required:true
    },
    Bank:{
        type:String,
        required:true
    },
    Purpose:{
        type:String,
        required:true
    },
    SLUploadDate:{
        type:Date,
        required:true
    },
    CnfStatus: {
        type:Boolean,
    },
});

module.exports = mongoose.model(
    "payModel", //file name
    paySchema  //schema
);