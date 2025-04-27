const Payment = require("../Model/payModel.js");


//data display
const getAllResources = async (req, res, next) => {
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
    const {userName,bank,branch,package,amount,slip,cnfStatus} = req.body;
    let Payments;
    try{
        Payments = new Payment({userName,bank,branch,package,amount,slip,cnfStatus});
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


