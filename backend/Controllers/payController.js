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

//Update 
const updateResource = async (req, res, next) => {
    const id=req.params.id;
    const {resource,resType,Purpose,PurchaseDate,DistributeDate} = req.body;

    let Resources;

    try{
        Resources = await Resource.findByIdAndUpdate(id ,
        {resource:resource, resType:resType, Purpose:Purpose, PurchaseDate:PurchaseDate, DistributeDate:DistributeDate});
        Resources = await Resources.save();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Resources){
        return res.status(404).json({message:"Unable to update resource"});
    }

    //display the resources
    return res.status(200).json({message:"Resource updated successfully", Resources});

};

//Delete resources
const deleteResource = async (req, res, next) => {
    const id=req.params.id;
    let Resources;

    try{
        Resources = await Resource.findByIdAndDelete(id);
    }catch(err){
        console.log(err);cl
    }

    //not found
    if(!Resources){
        return res.status(404).json({message:"Unable to delete resource"});
    }
    //display the resources
    return res.status(200).json({message:"Resource deleted successfully", Resources});
 
};

