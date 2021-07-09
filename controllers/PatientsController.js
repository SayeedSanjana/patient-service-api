import { Patient } from "../models/Patient.js";

export const patientList= async (req,res) =>{
    console.log("Get All Patient list Here");
    res.send("Get All Patient list Here");
};

export const patient = async (req,res) =>{
    // req.body provides the whole object passed
    // req.params gives the id or other parameters passed through URL
    console.log(`Get Specific Patient Here: ${req.params.id}`);
    res.send(`Get Specific Patient Here: ${req.params.id}`);
};

export const create = async (req,res) =>{
    console.log("Create A Patient Here");
    res.send("Create A Patient Here");
};

export const update = async (req,res) =>{
    console.log(`Update A Patient Here : ${req.params.id}`);
    res.send(`Update A Patient Here : ${req.params.id}`);
};

export const remove = async (req,res) =>{
    console.log(`Delete A Patient Here : ${req.params.id}`);
    res.send(`Delete A Patient Here : ${req.params.id}`);
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