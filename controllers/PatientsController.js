import { isValidObjectId } from "mongoose";
import { Patient } from "../models/Patient.js";
import mongoose from "mongoose";


export const patientList= async (req,res) =>{
  try {
    const patList = await Patient.find({});
    res.status(200).send(patList);
  } catch (error) {
    
  }  
  console.log("Get All Patient list Here"); 
    // res.send("Get All Patient list Here");
};

export const patient = async (req,res) =>{
    // req.body provides the whole object passed
    // req.params gives the id or other parameters passed through URL
    let patient = '';
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {

        patient =  await Patient.findById(req.params.id);
      
      }else{
      
        patient = await Patient.findOne({uuid:req.params.id});
      
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
        const existPatient= await Patient.findOne({uuid:req.body.uuid});
        
        if(existPatient){
            res.status(403).json("Patient General Info Already Exist")
        }else{
        
        const newPatientInfoCreate = await Patient.create(req.body, { runValidators:true });

        res.status(200).json(newPatientInfoCreate);
    }
    
    } catch (err) {

      res.status(500).json(err);
    
    }
    
};

export const update = async (req,res) =>{

          try {
            const patient = await Patient.findByIdAndUpdate
            (
              req.params.id,
              req.body, 
              {
                runValidators: true,
                new:true
              }
            );
            res.status(200).json({
              message : "Your General Information has been updated", 
              result: patient
            });

          } catch (err) {
            return res.json({error : err});
          }
      
    // console.log(`Update A Patient Here : ${req.params.id}`);
    // res.send(`Update A Patient Here : ${req.params.id}`);
};

export const remove = async (req,res) =>{
        try {
          const patient = await Patient.findByIdAndDelete(req.params.id)
          res.status(200).json({message: "Account has been deleted", result:patient});
        } catch (err) {
          return res.status(500).json({error : err});
        }
    // console.log(`Delete A Patient Here : ${req.params.id}`);
    // res.send(`Delete A Patient Here : ${req.params.id}`);
};

// export const getAll = async (req, res, next)=>{
    
//     try {
//         const user = await User.find();
//         res.json(user);

//         console.log(user);

//     } catch (error) {
//         res.json({message: error});
//     }
// }


// const patient = await Patient.findOne({
        //   $or: [
        //     {_id:  ? req.params.id :'asdfghjklqwertyuiopzxcvbnm'}, 
        //     {uuid: req.params.id}
        //   ]
      // });