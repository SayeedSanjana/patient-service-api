
import { Vaccine } from "../models/Patient.js";
import mongoose from "mongoose";


export const vaccineList= async (req,res) =>{
  try {
    const vaccineList = await Vaccine.find({});
    res.status(200).json({
      message:"Displaying Results",
      result:vaccineList
    });
  } catch (error) {
    res.status(403).json({
        message:"There is an error in displaying the list",
        error:error});
  }  
  
};

export const getSpecificVaccine = async (req,res) =>{
    
    let vaccine = '';
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {

        vaccine =  await Vaccine.findById(req.params.id);
      
      }else{
      
        vaccine = await Vaccine.findOne({ICD_10_CM:req.params.id});
      
      }
        
        res.status(200).json({
            message:"Displaying Results",
            result:vaccine
        });

      } catch (err) {
        res.status(403).json({
            message : "Vaccine doesnot exist ",
            error:err
        
        });
      }
    
};

export const create = async (req,res) =>{
    
    try {
        const existVaccine= await Vaccine.findOne({ICD_10_CM:req.body.ICD_10_CM});
        
        if(existVaccine){
            res.status(403).json("Vaccine already exist");
        }else{
        
        const newVaccineInfoCreate = await Vaccine.create(req.body);

        res.status(200).json({
            message:"Vaccine Created",
            result:newVaccineInfoCreate
        });
    }
    
    } catch (err) {

      res.status(403).json({
          message:"There has been an error ",
          result:err
      });
    
    }
    
};

export const update = async (req,res) =>{

          try {
            const vaccine = await Vaccine.findByIdAndUpdate
            (
              req.params.id,
              req.body, 
              {
                runValidators: true,
                new:true
              }
            );
            res.status(200).json({
              message : "Vaccine has been updated", 
              result: vaccine
            });

          } catch (err) {
            return res.status(403).json({
                message:"There has been an error",
                error : err});
          }
      
   
};

export const remove = async (req,res) =>{
        try {
          const vaccine = await Vaccine.findByIdAndDelete(req.params.id)
          res.status(200).json({
              message: "Vaccine has been deleted",
               result:vaccine
            });
        } catch (err) {
          return res.status(403).json({
              message:"There has been error",
              error : err});
        }
    
};



