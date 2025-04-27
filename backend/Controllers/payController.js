const Payment = require("../Model/payModel.js");


//data display
const getAllPayments = async (req, res, next) => {
    let Payments;

    try{
        Payments = await Payment.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Payments){
        return res.status(404).json({message:"Payments not found"});
    }

    //display the resources
    return res.status(200).json({ message:"Payments display successful",Payments});
};

//data Insert
const addPayment = async (req, res, next) => {
    const {userName,accountNo,bank,branch,package,amount,cnfStatus,slip} = req.body;
    let Payments;
    try{
        Payments = new Payment({userName,accountNo,bank,branch,package,amount,cnfStatus,slip});
        await Payments.save();
    }catch(err){
        console.log(err);
    }

    //not insert data
    if(!Payments){
        return res.status(404).send({message:"Failed to add payment"});
    }

    //data insert successfully
    return res.status(201).json({message:"Payment added successfully", Payments});
};

//get  by ID
const getByID = async (req, res,next) => {
    const id=req.params.id;
    let Payments;

    try{
        Payments = await Payment.findById(id);
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Payments){
        return res.status(404).json({message:"Payment not found"});
    }

    //display the resources
    return res.status(200).json({Payments});
};

//Update 
const updatePayment = async (req, res, next) => {
    const id=req.params.id;
    const {userName,accountNo,bank,branch,package,amount,cnfStatus,slip} = req.body;

    let Payments;

    try{
        Payments = await Payment.findByIdAndUpdate(id ,
        {userName:userName, accountNo:accountNo,bank:bank, branch:branch, package:package, amount:amount,cnfStatus:cnfStatus,slip:slip});
        Payments = await Payments.save();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Payments){
        return res.status(404).json({message:"Unable to update payment"});
    }

    //display the resources
    return res.status(200).json({message:"Payment updated successfully", Payments});

};

//Delete resources
const deletePayment = async (req, res, next) => {
    const id=req.params.id;
    let Payments;

    try{
        Payments = await Payment.findByIdAndDelete(id);
    }catch(err){
        console.log(err);cl
    }

    //not found
    if(!Payments){
        return res.status(404).json({message:"Unable to delete payment"});
    }
    //display the resources
    return res.status(200).json({message:"Payment deleted successfully", Payments});
 
};

exports.getAllPayments = getAllPayments;
exports.addPayment = addPayment;
exports.getByID = getByID;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;

