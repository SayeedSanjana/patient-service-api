import {TestImage } from "../models/Test.js";
import fs from 'fs';
import mongoose from "mongoose";

//Fetch list of all test images of all patients
export const testImageList = async (req,res) =>{
  try {
    let testList='';
    const resPerPage = 3; // results per page
    const page = req.params.page || 1; // Page 
    
    if (Object.keys(req.query).length>0){
      const search=req.query.search;
      if(mongoose.Types.ObjectId.isValid(search)){
        testList=await TestImage.findById(search);

      }else{
        testList = await TestImage.find({

          $or: [
            //{ _id: {$eq: mongoose.Types.ObjectId(search)} },//will be object chances of error in future
            { patientUuid: { $regex:search, $options: '$i' } },//will be object chances of error in future
            { title: { $regex:search, $options: '$i' } },
            { description: { $regex:search, $options: '$i' } },
            { suggestedBy: { $regex:search, $options: '$i' } }
          ]
          
        }).sort(({date: -1})).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage); ; 
      }
          }else{

            testList = await TestImage.find({}).sort(({date: -1})).skip((resPerPage * page) - resPerPage)
            .limit(resPerPage);
          }
    res.status(200).json({
      message:"Displaying Results",
      result:testList
    });
    console.log(testList);
    

  } catch (err) {
    res.status(403).json(
      {
        message:"Failed to load all tests",
        error:err
      }

    );
  }  
   
};



//Fetch list of test images of a specific patient by its uuid
export const getAllTestImagesById = async (req,res) =>{
    
    try {

        let imageData='';
        if (Object.keys(req.query).length>0){
        const search=req.query.search;
        imageData = await TestImage.find({
          
            patientUuid:req.params.id,
            $or: [
                 { title: { $regex:search, $options: '$i' } },
                 { suggestedBy: { $regex:search, $options: '$i' } }
                ]
                

          
        }).sort(({date: -1})); 
        
        
       
      }else{

         imageData = await TestImage.find({patientUuid:req.params.id}).sort(({date: -1}));     
      }  
        res.status(200).json(
          {
            message:"Displaying Results",
            result:imageData
          }
        );

      } catch (err) {
        res.status(403).json(
          {
            message : "Test does not exist ",
            error:err
          }
        );
      }
    
  
};

//Fetch selected test of a specidic patient using test id and patient uuid
export const getSpecificTestImage = async (req, res) =>{
  
    try {
      
      const imageData = await TestImage.find({patientUuid:req.params.id,_id:req.params.testId}).sort(({date: -1})); 
          
      res.status(200).json({
        message:"Displaying result",
        result:imageData
      });

    } catch (err) {
        res.status(403).json({
          message:"Test does not exist",
          error:err
        });
    }
};

// needs reviewing and correcting. need to add multer library
//Create a new test iamge
export const createTestImage = async (req,res) =>{
    try {
        
      // res.status(200).json(createPrescriptionImage);
      if (Object.keys(req.files).length) {
        
        let arr =[];
        req.files.forEach(item => arr.push(item.path));
        console.log(arr);
        req.body.images = arr;
        const createTestImage = await TestImage.create(req.body);
        console.log(createTestImage);
        res.status(200).json({
          message:"Test Created",
          result:createTestImage
        });

      }else{
        res.status(406).json({message: "Please Select Atleast One Image"});
      }
      
    }
    
    catch (err) {

      res.status(403).json({
        message:"Test not created",
        error:err
      });
    
    }
    
};
// Update test image attributes
export const updateTestImage = async (req,res) =>{

    try {
      const testImage = await TestImage.findByIdAndUpdate
      (
        req.params.id,
        req.body, 
        {
          runValidators: true,
          new:true
        }
      );
      res.status(200).json({
        message : "Your test image has been updated", 
        result: testImage
      });

    } catch (err) {
      return res.status(403).json({
        message:"Failed to update Test",
        error : err});
    }
   
};

// Deletes a test image 
export const removeTestImage = async (req,res) =>{
        try {
          const imageData=await TestImage.findOneAndDelete({patientUuid:req.params.id,_id:req.params.testId});
         
            
          imageData.images.forEach(item => {  
            fs.unlink(item,(err)=>{
              if (err) {
                  console.log("failed to delete local image:"+err);
              } else {
                console.log('successfully deleted local image');  
              }
              
            });
          });
          
          res.status(200).json({
            message:"Test Image Deleted Succesfully",
            result:imageData
          });                              
        
         
        } catch (err) {
          return res.status(403).json({
            message:"Failed to Delete Test",
            error : err});
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