
import { Allergy } from "../models/Patient.js";
import mongoose from "mongoose";


export const allergyList= async (req,res,next) =>{
  try {
    const allergyList = await Allergy.find({});
    res.status(200).json({
      message:"Displaying Results",
      result:allergyList
    });
    next();
  } catch (err) {
    res.status(403).json({
        message:"There is an error in displaying the list",
        error:err});

    next(err);
  }  
  
};

export const getSpecificAllergy = async (req,res,next) =>{
    
    let allergy = '';
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {

        allergy =  await Allergy.findById(req.params.id);
      
      }else{
      
        allergy = await Allergy.findOne({ICD_10_CM:req.params.id});
      
      }
        
        res.status(200).json({
            message:"Displaying Allergy",
            result:allergy
        });
        next();

      } catch (err) {
        res.status(403).json({
            message : "Allergy doesnot exist ",
            error:err
        
        });
        next(err);
      }
    
  
};

export const create = async (req,res,next) =>{
    
    try {
        const existAllergy= await Allergy.findOne({ICD_10_CM:req.body.ICD_10_CM});
        
        if(existAllergy){
            res.status(403).json("Allergy already exist");
        }else{
        
        const newAllergyInfoCreate = await Allergy.create(req.body);

        res.status(200).json({
            message:"Allergy Created",
            result:newAllergyInfoCreate
        }); 
    }
    next();
    
    } catch (err) {

      res.status(403).json({
          message:"There has been an error ",
          result:err
      });
      next(err);
    
    }
    
};

export const update = async (req, res, next) => {

  try {
    const allergy = await Allergy.findByIdAndUpdate(
      req.params.id,
      req.body, {
        runValidators: true,
        new: true
      }
    );
    res.status(200).json({
      message: "Allergy has been updated",
      result: allergy
    });
    next();

  } catch (err) {
    res.status(403).json({
      message: "There has been an error",
      error: err
    });
    next(err);
  }


};

export const remove = async (req, res, next) => {
  try {
    const allergy = await Allergy.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "Allergy has been deleted",
      result: allergy
    });
    next();
  } catch (err) {
    res.status(403).json({
      message: "There has been error",
      error: err
    });
    next(err);
  }

};



