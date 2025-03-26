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
        return res.status(404).json({message:"Resources not found"});
    }

    //display the resources
    return res.status(200).json({message:"Resource display successful", Payments});
};

//data Insert
const addPayments = async (req, res, next) => {
    const {resID,resType,Purpose,PurchaseDate,DistributeDate} = req.body;
    let Payments;
    try{
        Payments = new Resource({resID,resType,Purpose,PurchaseDate,DistributeDate});
        await Payments.save();
    }catch(err){
        console.log(err);
    }

    //not insert data
    if(!Payments){
        return res.status(404).send({message:"Failed to add resource"});
    }

    //data insert successfully
    return res.status(201).json({message:"Resource added successfully", Payments});
};

exports.getAllPayments = getAllPayments;
exports.addPayments = addPayments;

