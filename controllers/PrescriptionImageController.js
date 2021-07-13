import {PrescriptionImage } from "../models/Prescription.js";
import fs from 'fs';
import mongoose from "mongoose";

//Fetch list of all prescription images of all patients
export const prescriptionImageList = async (req,res) =>{
  try {
    let presList='';
    
    if (Object.keys(req.query).length>0){
      const search=req.query.search;
      if(mongoose.Types.ObjectId.isValid(search)){
        presList=await PrescriptionImage.findById(search);

      }else{
        presList = await PrescriptionImage.find({

          $or: [
                      //{ _id: {$eq: mongoose.Types.ObjectId(search)} },//will be object chances of error later
                      { patientUuid: { $regex:search, $options: '$i' } },//will be object chances of error later
                      { title: { $regex:search, $options: '$i' } },
                      { prescribedBy: { $regex:search, $options: '$i' } }
              ]
          
              }).sort(({date: -1})); 
      }
     
          }else{

            presList = await PrescriptionImage.find({}).sort(({date: -1}));
          }
    res.status(200).json(presList);
    console.log(presList);
    

  } catch (err) {
    res.status(403).json({error:err});
  }  
   
};

//Fetch list of prescription images of a specific patient by its uuid
export const getAllPrescripionImagesById = async (req,res) =>{
    
    try {

        let imageData='';
        if (Object.keys(req.query).length>0){
        const search=req.query.search;
        imageData = await PrescriptionImage.find({
          $and:[
            {patientUuid:req.params.id},
            {$or: [
                 { title: { $regex:search, $options: '$i' } },
                 { prescribedBy: { $regex:search, $options: '$i' } }
                ]
                }

          ]
        }).sort(({date: -1})); 
        
        
       
      }else{

         imageData = await PrescriptionImage.find({patientUuid:req.params.id}).sort(({date: -1}));     
      }  
        res.status(200).json(imageData);

      } catch (err) {
        res.status(403).json({message : "Prescription does not exist " + err});
      }
    
  
};

//Fetch selected prescription of a specidic patient using prescription id and patient uuid
export const getSpecificPrescripionImage = async (req, res) =>{
  
    try {
      
      const imageData = await PrescriptionImage.find({patientUuid:req.params.id,_id:req.params.presId}).sort(({date: -1})); 
          
      res.status(200).json(imageData);

    } catch (error) {
        res.status(403).json(error);
    }
};

// needs reviewing and correcting. need to add multer library
//Create a new prescription iamge
export const createPrescriptionImage = async (req,res) =>{
    try {
        
      // res.status(200).json(createPrescriptionImage);
      if (Object.keys(req.files).length) {
        
        let arr =[];
        req.files.forEach(item => arr.push(item.path));
        req.body.images = arr;
        const createPrescriptionImage = await PrescriptionImage.create(req.body);
        res.status(200).json(createPrescriptionImage);

      }else{
        res.status(406).json({message: "Please Select Atleast One Image"});
      }
      
    }
    
    catch (err) {

      res.status(403).json(err);
    
    }
    
};
// Update prescription image attributes
export const updatePrescriptionImage = async (req,res) =>{

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
        message : "Your Prescription has been updated", 
        result: prescriptionImage
      });

    } catch (err) {
      return res.status(403).json({error : err});
    }
   
};


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