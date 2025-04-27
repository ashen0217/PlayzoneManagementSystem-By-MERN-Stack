const Resource = require("../Model/resModel.js");

//data display
const getAllResources = async (req, res, next) => {
    let Resources;

    try{
        Resources = await Resource.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Resources){
        return res.status(404).json({message:"Resources not found"});
    }

    //display the resources
    return res.status(200).json({ message:"Resources display successful",Resources});
};

//data Insert
const addResource = async (req, res, next) => {
    const {resource,resType,Purpose,PurchaseDate,DistributeDate} = req.body;
    let Resources;
    try{
        Resources = new Resource({resource,resType,Purpose,PurchaseDate,DistributeDate});
        await Resources.save();
    }catch(err){
        console.log(err);
    }

    //not insert data
    if(!Resources){
        return res.status(404).send({message:"Failed to add resource"});
    }

    //data insert successfully
    return res.status(201).json({message:"Resource added successfully", Resources});
};

//get  by ID
const getByID = async (req, res,next) => {
    const id=req.params.id;
    let Resources;

    try{
        Resources = await Resource.findById(id);
    }catch(err){
        console.log(err);
    }

    //not found
    if(!Resources){
        return res.status(404).json({message:"Resource not found"});
    }

    //display the resources
    return res.status(200).json({Resources});
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

exports.getAllResources = getAllResources;
exports.addResource = addResource;
exports.getByID = getByID;
exports.updateResource = updateResource;
exports.deleteResource=deleteResource;