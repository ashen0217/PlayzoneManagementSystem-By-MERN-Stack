const User = require("../Model/userModel");

//data display
const getAllUsers = async (req, res, next) => {
    let Users;

    try{
        Users = await User.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Users){
        return res.status(404).json({message:"Users not found"});
    }

    //display the resources
    return res.status(200).json({Users});
};

//data Insert
const addUser = async (req, res, next) => {
    const {name,email,age,gender,phone,password} = req.body;
    
    let Users;
    try{
        Users = new User({name,email,age,gender,phone,password});
        await Users.save();
    }catch(err){
        console.log(err);
    } 

    //not insert data
    if(!Users){
        return res.status(404).json({message:"Failed to add user"});
    }

    //data insert successfully
    return res.status(201).json({message:"User added successfully", Users});
};

//get by ID
const getByID = async (req, res,next) => {
    const id=req.params.id;
    let Users;

    try{
        Users = await User.findById(id);
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Users){
        return res.status(404).json({message:"User not found"});
    }

    //display the user
    return res.status(200).json({message:"User found" , Users});
};

//get by email
const getByEmail = async (req, res, next) => {
    const email = req.params.email;
    let Users;

    try {
        Users = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    //not found
    if (!Users) {
        return res.status(404).json({ message: "User not found" });
    }

    //display the user
    return res.status(200).json({ message: "User found", Users });
};

//Update resources
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, age, gender, phone, password } = req.body;

    try {
        // Find the user first
        let user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only the provided fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;
        if (gender) user.gender = gender;
        if (phone) user.phone = phone;
        if (password) user.password = password;

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

//Delete resources
const deleteUser = async (req, res, next) => {
    const id=req.params.id;
    let Users;

    try{
        Users = await User.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Users){
        return res.status(404).json({message:"Unable to delete User"});
    }
    //display the resources
    return res.status(200).json({message:"User deleted successfully", Users});
 
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.getByID = getByID;
exports.getByEmail = getByEmail;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;





