
import { BasicProfile, Patient } from "../models/Patient.js";
import mongoose from "mongoose";
import { convertToDotNotation, removeObjKeyValueNull, reshape } from "../helpers/reshape.js";


export const patientList= async (req,res) =>{
  try {
    const patList = await Patient.find({});
    res.status(200).json({
      message:"Displaying Results",
      result:patList
    });
  } catch (error) {
    res.status(403).json({error:error});
  }  
  
};

export const patient = async (req,res) =>{
    // req.body provides the whole object passed
    // req.params gives the id or other parameters passed through URL
    let patient = '';
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {

        patient =  await Patient.findById(req.params.id);
      
      }else{
      
        patient = await Patient.findOne({puuid:req.params.id});
      
      }
        
        res.status(200).json(patient);

      } catch (err) {
        res.status(403).json({message : "Patient doesnot exist " + err});
      }
    
  
    //console.log(`Get Specific Patient Here: ${req.params.id}`);
    //res.send(`Get Specific Patient Here: ${req.params.id}`);
};

export const create = async (req,res) =>{
    // console.log("Create A Patient Here");
    // res.send("Create A Patient Here");
    //Checking if the patient Already exist
    try {

        const existPatient= await Patient.findOne({puuid:req.body.puuid});

        if(existPatient){
          res.status(403).json("Patient General Info Already Exist")
        }else{
        
        const newPatientInfoCreate = await Patient.create(req.body);
        await BasicProfile.create({patientId:newPatientInfoCreate._id});

        res.status(201).json({
          message: "User Information Updated",
          result:newPatientInfoCreate
        });
    }
    
    } catch (err) {

      res.status(403).json({
        message:"Error Occured During Updating Information",
        error:err
      });
    
    }
    
};
// this method will not update emergency contact, address and profile picture
// this method will only update other general fields
export const update = async (req,res) =>{

  try {
    // parameters that should be dropped when reaching this api

    const dropParams = ['address','emergency','profilePic'];
    
    // only call reshape if any of the drop params exist
    let existParams = Object.keys(req.body).some(item => dropParams.includes(item));
    const requestBody = existParams ? reshape(req.body,dropParams): req.body;
    
    console.log(requestBody);
    let patient = await Patient.findByIdAndUpdate
    (
      req.params.id,
      requestBody, 
      {
        runValidators: true,
        new:true
      }
    );
    
    patient = reshape(patient.toObject(),dropParams);

    // console.log(patient);
    res.status(201).json({
      message : "Your General Information has been updated", 
      result: patient
    });

  } catch (err) {
    return res.status(403).json({
      message:"Error Occured!!. Failed to update information",
      error : err
    });
  }
      
};


export const remove = async (req,res) =>{
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id)
    res.status(201).json({
      message: "Account has been deleted",
      result:patient
    });

  } catch (err) {
    return res.status(403).json({
      message:"Account cannot be deleted",
      error : err
    });
  }
};

// add or remove address method
// update emergency contact method
// add emergency (array of contacts) contact method

// update address method
export const updateAddress = async (req,res) =>{
  
  try {
    let requestBody = convertToDotNotation(req.body);
    // debug 
    // console.log(requestBody);
    // request body filter any key value null
    removeObjKeyValueNull(requestBody);
    const patient=await Patient.findByIdAndUpdate
    (
      req.params.id,
      {$set:requestBody},
      {
        new:true,
        runValidators:true,
      }
    );
    const address = patient.address;
    res.status(200).json({
      message:"Patient Address Updated",
      result:address
    });

  }catch(err){
    res.status(403).json(err);
  }
};

export const removeAddress = async (req,res) =>{
  
  try {

    const patient=await Patient.findByIdAndUpdate(
      req.params.id,
      {$unset:{address:""}},
    );
    
    let addressKeyExist = Object.keys(patient.toObject()) 
    
    !addressKeyExist.includes('address')?
    res.status(404).json({message:"Error! Address does not exist",result: patient.address}): 
    res.status(201).json({message:"Address Removed",result: patient.address});
      
  }catch(err){
    res.status(403).json({
      message:'Error Occured!! During Removing Address',
      error:err
    });
  }
}