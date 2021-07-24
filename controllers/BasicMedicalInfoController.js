import { Allergy,Vaccine,Patient,DiseaseLabel,BasicProfile } from "../models/Patient.js";
import mongoose from "mongoose";


export const createAllergy=async(req,res)=>{
    try{
        let allergy=req.body.allergies;
      
        const patientId=mongoose.Types.ObjectId(req.body.patientUuid);
        //allergy.forEach(items => items._id = mongoose.Types.ObjectId(items._id));
            
        let patientBasicObj=await BasicProfile.findOne({patientId:patientId});
        
        let patientAllergy=patientBasicObj.allergies;
           
        if(patientAllergy.length==0){
            const basicProfile=await BasicProfile.findOneAndUpdate({
                patientId:patientId,
                $set:{
                    allergies:allergy
                }
            });
            res.status(200).json({
                message:"Added",
                result:basicProfile
            });

        }
        
        else{
            
            let result = allergy.filter(v => !patientAllergy.some(u => JSON.stringify(u._id) === JSON.stringify (v._id)));
            if(result.length>0){

                patientAllergy=patientAllergy.concat(result);
                const basicProfile=await BasicProfile.findOneAndUpdate(
                    {
                    patientId:patientId,
                    $set:{
                        allergies:patientAllergy
                        }
                    });
                res.status(200).json({
                    message:"Added",
                    result:basicProfile
                })
            
            }else{
                res.status(403).json({
                message:"All your allergies already exist",
                    
                })
                
            }

        }    

    }catch(err){
    res.status(403).json({
                    message:"Incorrect Id Or Doesnot exist",
                    error:err
                });

    }
}

export const createVaccine=async(req,res)=>{
    try{
        let vaccine=req.body.vaccine;
        console.log(vaccine);
      
        const patientId=mongoose.Types.ObjectId(req.body.patientId);
        //allergy.forEach(items => items._id = mongoose.Types.ObjectId(items._id));
            
        let patientBasicObj=await BasicProfile.findOne({patientId:patientId});
        
        let patientVaccine=patientBasicObj.vaccination;
           
        if(patientVaccine.length==0){
            const basicProfile=await BasicProfile.findOneAndUpdate({
                patientId:patientId,
                $set:{
                    vaccination:vaccine
                }
            });
            res.status(200).json({
                message:"Added",
                result:basicProfile
            });

        }
        
        else{
            
            let result = vaccine.filter(v => !patientVaccine.some(u => JSON.stringify(u._id) === JSON.stringify (v._id)));
            if(result.length>0){

                patientVaccine=patientVaccine.concat(result);
                const basicProfile=await BasicProfile.findOneAndUpdate(
                    {
                    patientId:patientId,
                    $set:{
                        vaccination:patientVaccine
                        }
                    });
                res.status(200).json({
                    message:"Added",
                    result:basicProfile
                })
            
            }else{
                res.status(403).json({
                message:"All your vaccination already exist",
                    
                })
                
            }

        }    

    }catch(err){
    res.status(403).json({
                    message:"Incorrect Id Or Doesnot exist",
                    error:err
                });

    }
}



// export const createDiseaseLabel = async (req,res) =>{
//     try{
//     const patientId=mongoose.Types.ObjectId(req.body.patientId);
//     const disease=req.body.diseaseTags;
//    // console.log(patientId);
    
//     //const disease=await DiseaseLabel.findById(diseaseId);
//     console.log(disease);

//     let patientBasicObj=await BasicProfile.findOne({patientId:patientId});
        
//     let patientDisease=patientBasicObj.diseaseTags;
//     console.log(patientDisease.length);
//     if(patientDisease.length==0){
//         const basicProfile=await BasicProfile.findOneAndUpdate({
//             patientId:patientId,
//             $set:{
//                 diseaseTags:disease
//             }
//         });
//         res.status(200).json({
//             message:"Added",
//             result:basicProfile
//         });


//     }else{
//         let result = disease.filter(v => !patientDisease.some(u => JSON.stringify(u._id) === JSON.stringify (v._id)));
//             if(result.length>0){

//                 patientDisease=patientDisease.concat(result);
//                 const basicProfile=await BasicProfile.findOneAndUpdate(
//                     {
//                     patientId:patientId,
//                     $set:{
//                         diseaseTags:patientDisease
//                         }
//                     });
//                 res.status(200).json({
//                     message:"Added",
//                     result:basicProfile
//                 })
            
//             }else{
//                 res.status(403).json({
//                 message:"Disease already exist",
                    
//                 })
                
//             }

//         } 
//     }catch(err){
//     res.status(403).json({
//         message:"Incorrect Id Or Doesnot exist",
//         error:err
//     });


// }
// }


export const createDiseaseLabel = async (req,res) =>{
    try{
    const patientId=mongoose.Types.ObjectId(req.body.patientId);
    const disease=req.body.diseaseTags;
   // console.log(patientId);
    
    //const disease=await DiseaseLabel.findById(diseaseId);
    console.log(disease);

    let patientBasicObj=await BasicProfile.findOne({patientId:patientId});
        
    let patientDisease=patientBasicObj.diseaseTags;
    console.log(patientDisease.length);
    if(patientDisease.length==0){
        const basicProfile=await BasicProfile.findOneAndUpdate({
            patientId:patientId,
            $set:{
                diseaseTags:disease
            }
        });
        res.status(200).json({
            message:"Added",
            result:basicProfile
        });


    }else{
        let result = disease.filter(v => !patientDisease.some(u => JSON.stringify(u._id) === JSON.stringify (v._id)));
            if(result.length>0){

                //patientDisease=patientDisease.concat(result);
                const basicProfile=await BasicProfile.findOneAndUpdate(
                    {
                    patientId:patientId,
                    $push:{
                        diseaseTags:result
                        }
                        
                    });
                res.status(200).json({
                    message:"Added",
                    result:basicProfile
                })
            
            }else{
                res.status(403).json({
                message:"Disease already exist",
                    
                })
                
            }

        } 
    }catch(err){
    res.status(403).json({
        message:"Incorrect Id Or Doesnot exist",
        error:err
    });


}
}

export const createBadHabits=async(req,res)=>{
    try{
        const patientId=mongoose.Types.ObjectId(req.body.patientId);
        const badHabits=req.body.badHabits;

        let patientBasicObj=await BasicProfile.findOne({patientId:patientId})
        let patientBadHabits=patientBasicObj.badHabits;

         if(patientBadHabits.length==0){

            const basicProfile=await BasicProfile.findOneAndUpdate({
            patientId:patientId,
            $push:{
                badHabits:badHabits
            }
            });
        res.status(200).json({
            message:"Added",
            result:basicProfile
        });

         }else{
            let result = badHabits.filter(v => !patientBadHabits.some(u => u === v));
            if(result.length>0){
                const basicProfile=await BasicProfile.findOneAndUpdate({
                    patientId:patientId,
                    $push:{
                        badHabits:result
                    }
                    });
                res.status(200).json({
                    message:"Added",
                    result:basicProfile
                });


            }else{
                res.status(403).json({
                message:"Bad Habits already exist",
                })

            }

         }
               
}catch(err){
    res.status(403).json({
                    message:"There has been an error",
                    error:err
                })

}
}


export const deleteAllergy = async (req,res) =>{
    try {
      const patientBasicObj = await BasicProfile.findOneAndUpdate({
          patientId:mongoose.Types.ObjectId(req.params.id),
           $pull: { allergies: { _id: mongoose.Types.ObjectId(req.body.allergyId) } } 
      })
      res.status(200).json({
          message: "Allergy deleted!",
          result:patientBasicObj});
    } catch (err) {
      return res.status(403).json({
          message:"Allergy couldnot be deleted",
          error : err});
    }
};

export const deleteVaccine = async (req,res) =>{
    try {
      const patientBasicObj = await BasicProfile.findOneAndUpdate({
          patientId:mongoose.Types.ObjectId(req.params.id),
           $pull: { vaccination: { _id: mongoose.Types.ObjectId(req.body.vaccineId) } } 
      })
      res.status(200).json({
          message: "Vaccine deleted!",
          result:patientBasicObj});
    } catch (err) {
      return res.status(403).json({
          message:"Vaccine couldnot be deleted",
          error : err});
    }
};


export const deleteDisease= async (req,res) =>{
    try {
      const patientBasicObj = await BasicProfile.findOneAndUpdate({
          patientId:mongoose.Types.ObjectId(req.params.id),
           $pull: { diseaseTags: { _id: mongoose.Types.ObjectId(req.body.diseaseId) } } 
      })
      res.status(200).json({
          message: "Disease deleted!",
          result:patientBasicObj});
    } catch (err) {
      return res.status(403).json({
          message:"Disease couldnot be deleted",
          error : err});
    }
};


export const deleteBadHabits= async (req,res) =>{
    try {
      const patientBasicObj = await BasicProfile.findOneAndUpdate({
          patientId:mongoose.Types.ObjectId(req.params.id),
           $pull: { badHabits: req.body.badHabits  } 
      })
      res.status(200).json({
          message: "Bad Habits deleted!",
          result:patientBasicObj});
    } catch (err) {
      return res.status(403).json({
          message:"Bad Habits couldnot be deleted",
          error : err});
    }
};
