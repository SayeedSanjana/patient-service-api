import {PrescriptionImage } from "../models/Prescription.js";
import fs from 'fs';

export const prescriptionImageList = async (req,res) =>{
  try {
    const presList = await PrescriptionImage.find({});
    res.status(200).json(presList);
    console.log(presList);
    

  } catch (err) {
    res.status(403).json({error:err});
  }  
    // res.send("Get All Patient list Here");
};

export const getAllPrescripionImagesById = async (req,res) =>{
    // req.body provides the whole object passed
    // req.params gives the id or other parameters passed through URL
    
    try {
        const imageData = await PrescriptionImage.find({patientUuid:req.params.id});       
        res.status(200).json(imageData);

      } catch (err) {
        res.status(403).json({message : "Prescription does not exist " + err});
      }
    
  
    //console.log(`Get Specific Patient Here: ${req.params.id}`);
    //res.send(`Get Specific Patient Here: ${req.params.id}`);
};

export const getSpecificPrescripionImage = async (req, res) =>{
  
    try {
      const imageData = await PrescriptionImage.find({patientUuid:req.params.id,_id:req.params.presId});       
      res.status(200).json(imageData);

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
    } catch (error) {
        res.status(403).json(error);
    }
}

// needs reviewing and correcting. need to add multer library
export const createPrescriptionImage = async (req,res) =>{
    try {
        
      // res.status(200).json(createPrescriptionImage);
      if (Object.keys(req.files).length) {
        
        let arr =[];
        req.files.forEach(item => arr.push(item.path));
        console.log(arr);
        req.body.images = arr;
        const createPrescriptionImage = await PrescriptionImage.create(req.body);
        console.log(createPrescriptionImage);
        res.status(200).json(createPrescriptionImage);

      }else{
        res.status(406).json({message: "Please Select Atleast One Image"});
      }
      
    }
    
    catch (err) {

      res.status(403).json(err);
    
    }
    
};
// needs to be tested
export const updatePrescriptionImage = async (req,res) =>{

    try {
      const prescriptionImage = await Prescription.findByIdAndUpdate
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
        result: prescriptionImage
      });

    } catch (err) {
      return res.status(403).json({error : err});
    }
      
    // console.log(`Update A Patient Here : ${req.params.id}`);
    // res.send(`Update A Patient Here : ${req.params.id}`);
};

// Deletes a prescription image // needs testing and correction
export const removePrescriptionImage = async (req,res) =>{
        try {
          const imageData=await PrescriptionImage.findOneAndDelete({patientUuid:req.params.id,_id:req.params.presId});
         
            
          imageData.images.forEach(item => {  
            fs.unlink(item,(err)=>{
              if (err) {
                  console.log("failed to delete local image:"+err);
              } else {
                console.log('successfully deleted local image');  
              }
              
            });
          });
          
          res.status(200).json(imageData);                              
        
          // const prescriptionImage = await Prescription.findByIdAndDelete(req.params.id)
          // res.status(200).json({message: "Account has been deleted", result:prescriptionImage});
        } catch (err) {
          return res.status(403).json({error : err});
        }
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