
import { BasicProfile, Patient } from "../models/Patient.js";
import mongoose from "mongoose";


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
        //const basicProfile= await BasicProfile.create({patientUuid:newPatientInfoCreate._id});

        res.status(200).json(newPatientInfoCreate);
    }
    
    } catch (err) {

      res.status(403).json(err);
    
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
            return res.status(403).json({error : err});
          }
      
    // console.log(`Update A Patient Here : ${req.params.id}`);
    // res.send(`Update A Patient Here : ${req.params.id}`);
};

export const remove = async (req,res) =>{
        try {
          const patient = await Patient.findByIdAndDelete(req.params.id)
          res.status(200).json({message: "Account has been deleted", result:patient});
        } catch (err) {
          return res.status(403).json({error : err});
        }
    // console.log(`Delete A Patient Here : ${req.params.id}`);
    // res.send(`Delete A Patient Here : ${req.params.id}`);
};



export const updateAddress = async (req,res) =>{
  
  // await Patient.find({_id:req.params.id}, (err, patient) => {
  //   const addresses=patient.address;
  //   console.log(addresses); //gives an array back
  //   const address = _.find(addresses, {_id:req.params.addrId} );
  //   console.log(address); //gives the value of 'undefined' for whatever reason
  // });

  const patientId= req.params.id;
  const addressId=req.params.addrId;

  try {
    //const obj=await Patient.findOne(obj)
   // const patient=await Patient.updateOne({id_},obj=>obj._id==req.params.id);
    //  const patient=await Patient.updateOne({_id:patientId},
    //   {
    //     $set:{
             
    //         'address.$[addr].addressType':req.body.addressType,
    //         'address.$[addr].country':req.body.country,
    //         'address.$[addr].area':req.body.area,
    //         'address.$[addr].city':req.body.city,
    //         'address.$[addr].location':req.body.location
            
    //     }

    //   },
    //     {arrayFilters:[{'addr._id':addressId}]},
    //     {new:true}
    //   );
      res.status(200).json("updated");
      
  }
    
       catch(err){
   res.status(403).json(err);
}

    
// console.log(`Update A Patient Here : ${req.params.id}`);
// res.send(`Update A Patient Here : ${req.params.id}`);
};

// export const updateEmergency = async (req,res) =>{
  
//   const patientId= req.params.id;
//   const emergencyId=req.params.emId;

//   try {
//      const patient=await Patient.updateOne({_id:patientId},
//       {
//         $set:{
             
//             'emergency.$[em].name':req.body.name,
//             'emergency.$[em].relation':req.body.relation,
//             'emergency.$[em].contact':req.body.contact,
            
            
//         }

//       },
//         {arrayFilters:[{'em._id':emergencyId}]},
//         {new:true}
//       );
//       res.status(200).json("updated");
      
//   }
    
//        catch(err){
//    res.status(403).json(err);
// }
// }
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