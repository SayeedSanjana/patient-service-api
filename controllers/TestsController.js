import { Test } from "../models/Test.js";
import mongoose from "mongoose";
import multer from "multer";


const uploads=multer({dest:'uploads/'});

export const create = async (req,res) =>{
    // console.log("Create A Patient Here");
    // res.send("Create A Patient Here");
    //Checking if the patient Already exist
    // try {
    //     const existPatient= await Patient.findOne({uuid:req.body.uuid});
        
    //     if(existPatient){
    //         res.status(403).json("Patient General Info With This UUID Already Exist")
    //     }else{
        
    //       const newPatientInfoCreate = await Patient.create(req.body );

    //     res.status(200).json(newPatientInfoCreate);
    // }
    
    // } catch (err) {

    //   res.status(403).json(err);
    
    // }
    
};
