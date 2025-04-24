const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resSchema = new Schema({
    resource:{
        type: String, 
        required: true
    },
    resType:{
        type:String,
        required:true
    },
    Purpose:{
        type:String,
        required:true
    },
    PurchaseDate:{
        type:Date,
        required:true
    },
    DistributeDate:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model("resModel", resSchema);