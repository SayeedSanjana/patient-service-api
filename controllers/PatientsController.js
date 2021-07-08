import { Patient } from "../models/Patient.js";

export const getAll = (req,res) =>{
    console.log("Controller is working");
    res.send("Controller is working");
}

// export const getAll = async (req, res, next)=>{
    
//     try {
//         const user = await User.find();
//         res.json(user);

//         console.log(user);

//     } catch (error) {
//         res.json({message: error});
//     }
// }