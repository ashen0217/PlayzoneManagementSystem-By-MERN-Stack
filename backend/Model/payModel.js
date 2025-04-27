const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paySchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    accountNo:{
        type:Number,
        required:true
    },
    bank:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    package:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    slip:{
        data:Buffer,  //binary data
        contentType:String
    },
    cnfStatus:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("payModel", paySchema);
