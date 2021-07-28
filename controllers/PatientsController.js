import {BasicProfile,Patient} from "../models/Patient.js";
import mongoose from "mongoose";
import {convertToDotNotation,removeObjKeyValueNull,reshape} from "../helpers/reshape.js";
import upload from "../middleware/upload.js";


export const patientList = async (req, res) => {
  try {
    const patList = await Patient.find({});
    res.status(200).json({
      message: "Displaying Results",
      result: patList
    });
  } catch (error) {
    res.status(403).json({
      error: error
    });
  }
  
};
// =================================================================================================================================

export const patient = async (req, res) => {
  // req.body provides the whole object passed
  // req.params gives the id or other parameters passed through URL
  let patient = '';
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {

      patient = await Patient.findById(req.params.id);

    } else {

      patient = await Patient.findOne({
        puuid: req.params.id
      });

    }

    res.status(200).json(patient);

  } catch (err) {
    res.status(403).json({
      message: "Patient doesnot exist " + err
    });
  }

};

// =================================================================================================================================

export const create = async (req, res) => {
  // console.log("Create A Patient Here");
  // res.send("Create A Patient Here");
  //Checking if the patient Already exist
  try {

    const existPatient = await Patient.findOne({
      puuid: req.body.puuid
    });

    if (existPatient) {
      res.status(403).json("Patient General Info Already Exist")
    } else {

      if (Object.keys(req.files.length)) {
        console.log(req.files.length);
        if (req.files.length == 1) {
          //upload.array("images",12)

          let arr = [];
          //arr.push(req.file.path);
          req.files.forEach(item => arr.push(item.path));
          req.body.images = arr;


          const newPatientInfoCreate = await Patient.create(req.body);
          await BasicProfile.create({
            patientId: newPatientInfoCreate._id,
            puuid: newPatientInfoCreate.puuid
          });

          res.status(201).json({
            message: "User Information Created",
            result: newPatientInfoCreate
          });

        } else if(req.files.length >1){

          res.status(406).json({
            message: "Please insert only one image",
          });

        }
      
       else {
          const newPatientInfoCreate = await Patient.create(req.body);
          await BasicProfile.create({
            patientId: newPatientInfoCreate._id,
            puuid: newPatientInfoCreate.puuid
          });
        
        if(existPatient){
            res.status(403).json("Patient General Info With This UUID Already Exist")
        }else{
        
          const newPatientInfoCreate = await Patient.create(req.body );

    }
  }

  } catch (err) {

    res.status(403).json({
      message: "Error Occured During Creating Information",
      error: err
    });

  }

};

export const update = async (req,res) =>{

          try {
            const patient = await Patient.findByIdAndUpdate
            (
              req.params.id,
              req.body, 
              {
                $set:req.body,
                runValidators: true,
                new:true
              }
            );
            res.status(200).json({
              message : "Your General Information has been updated", 
              result: patient
            });

          } catch (err) {
            return res.status(403).json({error : err});
          }

        });
        res.status(201).json({
          message: "Emergency Contact Added",
          result: patientEmergencyAddress
        });

      } else {
        res.status(409).json({
          message: "Contact already exist"
        });
      }

    }
  } catch (err) {
    res.status(400).json({
      message:"Something went wrong!",
      error:err
    });
  }
};

// =================================================================================================================================

// update emergency contact
export const updateEmergency = async (req, res) => {

  try {

    let updateContact = req.body;

    // fetching all patient emergency contacts
    let patientEmergency = await Patient.findById(req.params.id).select({
      'emergency': 1,
      '_id': 0
    }).lean();

    //console.log(patientEmergency);

    //check existence of the similar contact
    patientEmergency.emergency.forEach(item => {
      if (item.contact.replace(/-/g, "") === (req.body.contact).replace(/-/g, "")) {
        return res.status(409).json({
          message: "Number already exist"
        });
      }
    });
    
    //get index of the matched object
    let idx = 0;
    patientEmergency.emergency.forEach((item, index) => {
      
      if (JSON.stringify(item._id) === JSON.stringify(req.params.emid)) return idx = index;

    });

    let prefix = "emergency." + idx + ".";

    let requestBody = convertToDotNotation(updateContact, {}, prefix);
    console.log(requestBody);

    //request body filter any key value null
    removeObjKeyValueNull(requestBody);


    const patient = await Patient.findByIdAndUpdate(
      req.params.id, {
        $set: requestBody
      }, {
        new: true,
        runValidators: true,
      }
    );
    const emergency = patient.emergency;
    res.status(200).json({
      message: "Emergency Contact Updated",
      result: emergency
    });


  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error:err
    });
  }
};
// =================================================================================================================================

// delete emergency contact
export const removeEmergency = async (req, res) => {

  try {

    const patientEmergency = await Patient.findByIdAndUpdate(
      
      req.params.id, 
      {
        $pull: {
          "emergency": {"_id": mongoose.Types.ObjectId(req.params.emid)}
        }
      }, 
      {
        safe: true,
        multi: true
      }
    );
    res.status(200).json({
      message: "Emergency Contact Removed",
      result: patientEmergency
    });

  } catch (err) {
    res.status(400).json({
      message:"Something went wrong",
      error:err
    });
  }
};
// =================================================================================================================================




export const updateAddress = async (req,res) =>{

  try {
    const patient = await Patient.address.findById({_id:req.params.addrId});
    res.status(200).json({
      message : "Your Address has been accessed", 
      result: patient
    });

  } catch (err) {
    return res.status(403).json({error : err});
  }

// console.log(`Update A Patient Here : ${req.params.id}`);
// res.send(`Update A Patient Here : ${req.params.id}`);
};

// export const getAll = async (req, res, next)=>{
    
//     try {
//         const user = await User.find();
//         res.json(user);

  try {

    let img="";

    if (Object.keys(req.files.length)) {
      
    if (req.files.length == 1){
      req.files.forEach(item=>img=item.path);
      //console.log(img);
  
       const patientprofilepic = await Patient.findOneAndUpdate(
        
        {_id:req.params.id}, 
        {
          $push: {
            "images": img
          }
        }, 
        {new:true}
        
      );
  
      let image=patientprofilepic.images;
      image=image[image.length-1];
      console.log(image);
  
      res.status(200).json({
        message: "Profile Picture Uploaded",
        result: image
      });
    }else{
      res.status(406).json({
        message: "Select a image"
      });
      
    }
   
    }


  } catch (err) {
    res.status(400).json({
      message:"Something went wrong",
      error:err
    });
  }
};

// const patient = await Patient.findOne({
        //   $or: [
        //     {_id:  ? req.params.id :'asdfghjklqwertyuiopzxcvbnm'}, 
        //     {uuid: req.params.id}
        //   ]
      // });
      
