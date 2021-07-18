import { Allergy,Vaccine,Patient,DiseaseLabel,BasicProfile } from "../models/Patient.js";
import mongoose from "mongoose";

// export const createAllergy=async(req,res)=>{
//     try{
//         const allergyId=req.body.id;
//         const patientId=mongoose.Types.ObjectId(req.body.patientUuid);
        
        
    
//     // const existPatient=await BasicProfile.findOne({patientUuid:patientId});
//     // console.log(existPatient);


//     const existAllergy=await BasicProfile.findOne(
//         { 
//             patientUuid:patientId,
//             allergies:{
//                 $elemMatch:{ _id:allergyId}
//             }

         
//       }); 
//       console.log(existAllergy);
     
//       let arr=[];
//            arr.push({
//            _id:allergyId,
//          reason:req.body.reason
//           });
//           //console.log(arr);

    

//         if(existAllergy<=0){
//             const basicProfile = await BasicProfile.findOneAndUpdate({
//                 patientUuid:patientId,                             
//                 $push:{
//                         allergies:arr     
//                 }
                
//                 });
//             res.status(200).json({
//                 message:"Added",
//                 result:basicProfile
//             })
          
//        }else{
//            res.status(403).json("Allergy Already Exist");
//             }

      

// }catch(err){
//     res.status(403).json({
//                     message:"There has been an error",
//                     error:err
//                 })

// }
// }

export const createAllergy=async(req,res)=>{
    try{
        const allergy=req.body.allergies;
        const patientId=mongoose.Types.ObjectId(req.body.patientUuid);

       console.log(allergy);
        
    let allergyId; 
    allergy.forEach(item =>{
        allergyId=item._id;
        console.log(item._id);
    })
 
    const existAllergy=await BasicProfile.findOne(
        { 
            patientUuid:patientId,
            allergies:{
                $elemMatch:{ _id:allergyId}
            }
      }).count(); 
     
      
     
         if(existAllergy<=0){
            const basicProfile = await BasicProfile.findOneAndUpdate({
                patientUuid:patientId,                             
                $push:{
                        allergies:allergy  
                }
                
                });
            res.status(200).json({
                message:"Added",
                result:basicProfile
            })
          
       }else{
           res.status(403).json("Allergy Already Exist");
            }

      

}catch(err){
    res.status(403).json({
                    message:"There has been an error",
                    error:err
                })

}
}



export const createVaccine=async(req,res)=>{
    try{
        const vaccineName=req.body.name;
        const patientId=req.body.patientUuid;
        
        console.log(patientId);
        console.log(vaccineName);


    //     const vaccine= await Vaccine.find({"name" : vaccineName})
    //     //console.log(allergy);

    //     let vaccineId=""
    //     vaccine.forEach(item => {
    //                  vaccineId=item._id;
                    
    //             });
    //             vaccineId=mongoose.Types.ObjectId(vaccineId);
    //             console.log(vaccineId);


    //  const existPatient=await BasicProfile.findOne({patientUuid:patientId});
    //  console.log(existPatient);


    //  const existVaccine=await BasicProfile.find({ 
    //     vaccination: { 
    //        $elemMatch: { _id: vaccineId} 
    //      }
    //   }).count(); 
    //   console.log(existVaccine)

    //  if(!existVaccine>0){

    //     let arr=[];
    //        arr.push({
    //        _id:vaccineId,
    //        //date:req.body.date,
    //      administeredBy:req.body.administeredBy,
    //      registrationNo:req.body.registrationNo,
    //      //nextDosage:req.body.date,
    //      dosage:req.body.dosage



    //       });

    //      //console.log(arr);

    //       if(existPatient){
    //         const basicProfile = await BasicProfile.updateOne(
    //                       {
    //                         $push:{
    //                                 vaccination:arr
                
    //                             }
    //                         }
    //                     );
    //                     res.status(200).json({
    //                         message:"Added",
    //                         result:basicProfile
    //                     })

    //       }else{
    //         const basicProfile = new BasicProfile({
    //             patientUuid: patientId,
    //              vaccination:arr
    //              });
    //           basicProfile.save();

    //           res.status(200).json({
    //             message:"Added",
    //             result:basicProfile
    //         })
    //       }
     

    //  }else{
    //      res.status(403).json("Allergy always exists")
    //   }
        
        
}catch(err){
    res.status(403).json({
                    message:"There has been an error",
                    error:err
                })

}
}




// export const createVaccine = async (req,res) =>{

//     try{
//         const vaccineName=req.params.vaccine;
//     const patientId=mongoose.Types.ObjectId(req.params.id);

//     let vaccineId="";

//     const vaccine= await Vaccine.find({"name" : vaccineName})
//     vaccine.forEach(item => {
//          vaccineId=item._id;
        
//     });
//     vaccineId=mongoose.Types.ObjectId(vaccineId);

   
//    //const exist=arr.pop();

//     const existPatient=await BasicProfile.findOne({patientUuid:patientId});
//     const existVaccine=await BasicProfile.find({ 
//         vaccination: { 
//            $elemMatch: { _id: vaccineId} 
//         }
//      }).count(); 

//   if(Object.keys(req.files).length ){
//       if(!existVaccine>0  ){
//         upload.array("images",12)
//         let img =[];
//         req.files.forEach(item => img.push(item.path));
//          req.body.images = img;
      
          
//         let arr=[];
//         arr.push({
//             _id:vaccineId,
//             date:req.body.date,
//             registrationNo:req.body.registrationNo,
//             dosage:req.body.dosage,
//             administeredBy:req.body.administeredBy,
//             images:req.body.images
//         });
//         console.log(arr)
//         if(existPatient ){
//             const basicProfile = await BasicProfile.updateOne(
//                 {
//                     $push:{
//                         vaccination:arr
    
//                     }
//                 }
//             );
//             res.status(200).json({
//                 message:"Vaccination Added",
//                 result:basicProfile
                
//                 // that's it!
//               });
//         }else{
//             const basicProfile = new BasicProfile({
//                 patientUuid: patientId,
//                 vaccination:arr
                   
                  
//               });
//               basicProfile.save();
//               res.status(200).json({
//                 message:"Vaccination Added",
//                 result:basicProfile
                
//                 // that's it!
//               });
//         }


//       }else{
//         res.status(403).json("Vaccine already exist");
//       }
// //mmmmmm
    
    
//   }else{
//       res.status(403).json("Insert an image");
//   }
    
//     }catch(err){
//         res.status(403).json({
//             message:"There has been an error",
//             error:err
//         })
//     }

    

    
    
// };


export const createDiseaseLabel = async (req,res) =>{
    
}
