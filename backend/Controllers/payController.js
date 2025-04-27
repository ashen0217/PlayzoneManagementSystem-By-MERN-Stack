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
