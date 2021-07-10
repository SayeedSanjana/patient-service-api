import { Patient } from "../models/Patient.js";




export const patientList= async (req,res) =>{
    console.log("Get All Patient list Here"); 
    res.send("Get All Patient list Here");
};

export const patient = async (req,res) =>{
    // req.body provides the whole object passed
    // req.params gives the id or other parameters passed through URL

    try {
        const patient = await Patient.findById(req.params.id);
        //const patientuuid = await Patient.findOne({uuid:req.params.uuid})
        if (patient){
            const { uuid, ...other } = patient._doc;
            res.status(200).json(other);

        }else{
            res.status(403).json("Patient UUID doesnot match");
        }
        
      } catch (err) {
        res.status(403).json("Patient doesnot exist");
        res.status(500).json(err);
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
        
        const newPatientInfoCreate = await Patient.create(req.body);
        //const savedPatient = await newPatientInfo.save( { runValidators: true });  
        res.status(200).json(newPatientInfoCreate);
    }
    
    } catch (err) {
      res.status(500).json(err);
    }
    
};

export const update = async (req,res) =>{

        if (req.body._id === req.params.id ) {
          try {
            const patient = await Patient.findByIdAndUpdate(req.params.id, {
              $set: req.body,
              runValidators: true ,
            });
            res.status(200).json("Your General Information has been updated");
          } catch (err) {
            return res.status(500).json(err);
          }
        } else {
          return res.status(403).json("You can update only your account!");
        }
      
    // console.log(`Update A Patient Here : ${req.params.id}`);
    // res.send(`Update A Patient Here : ${req.params.id}`);
};

export const remove = async (req,res) =>{
    if (req.body._id === req.params.id ) {
      
        try {
          const patient = await Patient.findByIdAndDelete(req.params.id)
          res.status(200).json("Account has been deleted");
        } catch (err) {
          return res.status(500).json(err);
        }
      } else {
        return res.status(403).json("You can delete only your account!");
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