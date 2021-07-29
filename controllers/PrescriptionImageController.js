import {PrescriptionImage } from "../models/Prescription.js";
import fs from 'fs';
import mongoose from "mongoose";

//Fetch list of all prescription images of all patients
// needs work on the admin side
export const prescriptionImageList = async (req,res,next) =>{
  try {
    let presList='';
    
    if (Object.keys(req.query).length>0){
      const search=req.query.search;
      if(mongoose.Types.ObjectId.isValid(search)){
        presList=await PrescriptionImage.findById(search);

      }else{
        presList = await PrescriptionImage.find({

          $or: [
            //{ _id: {$eq: mongoose.Types.ObjectId(search)} },//will be object chances of error in future
            { puuid: { $regex:search, $options: '$i' } },//will be object chances of error in future
            { title: { $regex:search, $options: '$i' } },
            { description: { $regex:search, $options: '$i' } },
            { prescribedBy: { $regex:search, $options: '$i' } }
          ]
          
        }).sort(({date: -1})); 
      }
     
    }else{

      presList = await PrescriptionImage.find({}).sort(({date: -1}));
    }

    console.log(presList);
    
    res.status(200).json({
      message:"Displaying Results",
      result:presList
    });
    next();
    

  } catch (err) {
    res.status(403).json({
      message:"Failed to load all prescriptions",
      error:err
    });
    next(err);
  }  
   
};

//Fetch list of prescription images of a specific patient by its uuid
export const getAllPrescripionImagesById = async (req,res,next) =>{
    
  try {

    let imageData='';
    if (Object.keys(req.query).length>0){


    const search=req.query.search;
    imageData = await PrescriptionImage.find({
      puuid : req.params.id, 
      $or : [
        {title: { $regex: search, $options: '$i' }},
        {description:  { $regex: search, $options: '$i' }},
        {prescribedBy: { $regex: search, $options: '$i' }},

      ]
    }).sort(({date: -1})); 

    }else{

        imageData = await PrescriptionImage.find({puuid:req.params.id}).sort(({date: -1}));     
    }  
    
    res.status(200).json({
      message:"Displaying Results",
      result:imageData
    });
    next();

  } catch (err) {
    res.status(403).json({
      message : "Prescription does not exist ",
      error:err
    });
    next(err);
  }
    
  
};

//Fetch selected prescription of a specidic patient using prescription id and patient uuid
export const getSpecificPrescripionImage = async (req, res,next) =>{
  
  try {
    
    const imageData = await PrescriptionImage.find({puuid:req.params.id,_id:req.params.presId}).sort(({date: -1})); 
        
    res.status(200).json({
      message:"Displaying Results",
      result:imageData
    }
      
    );
    next();

  } catch (err) {
      res.status(403).json(
        {
          message : "Prescription does not exist ",
          error:err
        }
      );
      next(err);
  }
};

// needs reviewing and correcting. need to add multer library
//Create a new prescription iamge
export const createPrescriptionImage = async (req,res,next) =>{
  try {
      
    // res.status(200).json(createPrescriptionImage);
    if (Object.keys(req.files).length) {
      //upload.array("images",12)
      
      let arr =[];
      req.files.forEach(item => arr.push(item.path));
      //console.log(arr);
      req.body.images = arr;
      const createPrescriptionImage = await PrescriptionImage.create(req.body);
      //console.log(createPrescriptionImage);
      res.status(200).json({
        message:" Prescription Created",
        result:createPrescriptionImage
      });


    }else{
      res.status(406).json({message: "Please select atleast one image"});
    }
    next();
    
  }catch (err) {

    res.status(403).json({
      message:"Prescription not created",
      error:err
    });
    next(err);
  }   
};
// Update prescription image attributes
export const updatePrescriptionImage = async (req,res,next) =>{

  try {
    const prescriptionImage = await PrescriptionImage.findByIdAndUpdate
    (
      req.params.id,
      req.body, 
      {
        runValidators: true,
        new:true
      }
    );
    res.status(200).json({
      message : "Your prescription has been updated", 
      result: prescriptionImage
    });
    next();

  } catch (err) {
    res.status(403).json({
      message:"Failed to update prescription",
      error : err
    });
    next(err);
  }
   
};

export const removePrescriptionImage = async (req,res,next) =>{
  try {
    // console.log(req.params);
    const imageData= await PrescriptionImage.findOneAndDelete({
      _id:req.params.presId,
      puuid:req.params.id
    });
   
      
    imageData.images.forEach(item => {  
      fs.unlink(item,(err)=>{
        if (err) {
            console.log("Failed to delete local image:"+err);
        } else {
          console.log('Successfully deleted local image');  
        }
        
      });
    });
    
    res.status(200).json({
      message:"Prescription Image Deleted Succesfully",
      result:imageData});                              
  
   next();
  } catch (err) {
    res.status(403).json({error : err});
    next(err);
  }

};

// const patient = await Patient.findOne({
        //   $or: [
        //     {_id:  ? req.params.id :'asdfghjklqwertyuiopzxcvbnm'}, 
        //     {uuid: req.params.id}
        //   ]
      // });

      
        // const imageData = await Prescription.findOne({
        //     _id:req.params.id,
        // });
        // // document array returned and stored
        // let arr = imageData.pPrescriptionImage;

        // // searching specific id to return specific object
        // const obj = arr.find(o => o._id == req.params.presId)

        // console.log(obj);
        // // console.log(imageData.pPrescriptionImage);
        // res.status(200).json(obj);