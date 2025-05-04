const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type:String,
      required:true
    },
    email: {
      type:String,
      required:true
    },
    age: {
      type:String,
      required:true
    },
    gender:{
      type:String,
      required:true
    },
    phone: {
      type:String,
      required:true
    },  // Received as a string
    password: {
      type:String,
      required:true
    },// Received as a string
    joinDate: {
      type: Date,
      default: Date.now
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Suspended'],
      default: 'Active'
    }
  }
  );

module.exports = mongoose.model(
    "userModel", //file name
    userSchema  //schema
);
