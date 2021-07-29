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
        
        
          res.status(201).json({
            message: "User Information Created",
            result: newPatientInfoCreate
          });
        
        }

    }
  }

  } catch (err) {

    res.status(403).json({
      message: "Error Occured During Creating Information",
      error: err
    });

  }

};




// =================================================================================================================================

// this method will not update emergency contact, address and profile picture
// this method will only update other general fields
export const update = async (req, res, next) => {

  try {
    // parameters that should be dropped when reaching this api

    const dropParams = ['address', 'emergency', 'images'];

    // only call reshape if any of the drop params exist
    let existParams = Object.keys(req.body).some(item => dropParams.includes(item));
    const requestBody = existParams ? reshape(req.body, dropParams) : req.body;

    let patient = await Patient.findByIdAndUpdate(
      req.params.id,
      requestBody, {
        runValidators: true,
        new: true
      }
    );

    patient = reshape(patient.toObject(), dropParams);

    // console.log(patient);
    res.status(201).json({
      message: "Your General Information has been updated",
      result: patient
    });
    next();

  } catch (err) {
    res.status(400).json({
      message: "Error Occured!!. Failed to update information",
      error: err
    });
    next(err);
  }

};

// =================================================================================================================================

export const remove = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id)
    res.status(201).json({
      message: "Account has been deleted",
      result: patient
    });

  } catch (err) {
    return res.status(403).json({
      message: "Account cannot be deleted",
      error: err
    });
  }
};

// =================================================================================================================================

// update address method
export const updateAddress = async (req, res) => {

  try {
    let requestBody = convertToDotNotation(req.body);
    // debug 
    // console.log(requestBody);
    // request body filter any key value null
    removeObjKeyValueNull(requestBody);
    const patient = await Patient.findByIdAndUpdate(
      req.params.id, {
        $set: requestBody
      }, {
        new: true,
        runValidators: true,
      }
    );
    const address = patient.address;
    res.status(200).json({
      message: "Patient Address Updated",
      result: address
    });

  } catch (err) {
    res.status(400).json({
      message:"Something went wrong",
      error:err
    });
  }
};

// =================================================================================================================================


// add or remove address method
export const removeAddress = async (req, res) => {

  try {

    const patient = await Patient.findByIdAndUpdate(
      req.params.id, {
        $unset: {
          address: ""
        }
      },
    );

    const addressKeyExist = Object.keys(patient.toObject());

    // ternary operator used
    !addressKeyExist.includes('address') ?
      res.status(404).json({
        message: "Error! Address does not exist",
        result: patient.address
      }) :
      res.status(201).json({
        message: "Address Removed",
        result: patient.address
      });


  } catch (err) {
    res.status(400).json({
      message: 'Error Occured!! During Removing Address',
      error: err
    });
  }
};

// =================================================================================================================================

// update emergency contact method
// add emergency (array of contacts) contact method
export const addEmergency = async (req, res) => {

  try {

    let emergencyContact = req.body.emergency;

    let patientEmergency = await Patient.findById(req.params.id);

    patientEmergency = patientEmergency.emergency;

    if (patientEmergency.length == 0) {
      const patientEmergencyAddress = await Patient.findByIdAndUpdate(req.params.id, {
        $set: {
          emergency: emergencyContact

        }
      });
      res.status(201).json({
        message: "Added",
        result: patientEmergencyAddress
      });

    } else {

      let result = emergencyContact.filter(v => !patientEmergency.some(u => (u.contact.replace(/-/g, "")) === (v.contact.replace(/-/g, ""))));
      console.log(result)
      if (result.length > 0) {

        const patientEmergencyAddress = await Patient.findByIdAndUpdate(req.params.id, {

          $push: {
            emergency: result
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

export const updateProfileImage = async (req, res) => {

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

