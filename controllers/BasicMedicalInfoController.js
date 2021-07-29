import { Allergy,Vaccine,Patient,DiseaseLabel,BasicProfile } from "../models/Patient.js";
import mongoose from "mongoose";

export const createAllergy = async (req, res,next) => {
    try {
        let allergy = req.body.allergies;

        const patientId = mongoose.Types.ObjectId(req.params.patientId);
        //allergy.forEach(items => items._id = mongoose.Types.ObjectId(items._id));

        let patientBasicObj = await BasicProfile.findOne({
            patientId: patientId
        });

        let patientAllergy = patientBasicObj.allergies;

        if (patientAllergy.length == 0) {
            const basicProfile = await BasicProfile.findOneAndUpdate({
                patientId: patientId
            }, {
                $set: {
                    allergies: allergy
                }

            }, {
                new: true,
                //runValidators: true,
            });
            res.status(200).json({
                message: "Added",
                result: basicProfile.allergies
            });

        } else {

            let result = allergy.filter(v => !patientAllergy.some(u => u.name === v.name));
            if (result.length > 0) {

                //patientAllergy=patientAllergy.concat(result);
                const basicProfile = await BasicProfile.findOneAndUpdate({
                        patientId: patientId
                    }, {
                        $push: {
                            allergies: result
                        }
                    },

                    {
                        new: true,
                        //     runValidators: true,
                    });

                res.status(200).json({
                    message: "Added",
                    result: basicProfile.allergies
                })

            } else {
                res.status(409).json({
                    message: "Allergies already exist",

                })

            }

        }
        next();

    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
        next(err);

    }
};



export const deleteAllergy = async (req, res,next) => {
    try {

        let patientBasicObj = await BasicProfile.findOneAndUpdate({
            patientId: mongoose.Types.ObjectId(req.params.id)
        }, {
            $pull: {
                allergies: {
                    name: req.body.name
                }
            }
        }, {
            new: true
        });
        res.status(200).json({
            message: "Allergy deleted!",
            result: patientBasicObj.allergies
        });
        next();
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
        next(err);     
    }
};

export const createVaccine = async (req, res,next) => {
    try {
        let vaccine = req.body.vaccine;
        console.log(vaccine);

        const patientId = mongoose.Types.ObjectId(req.params.id);

        const basicProfile = await BasicProfile.findOneAndUpdate({
            patientId: patientId
        }, {
            $push: {
                vaccination: vaccine
            }
        }, {
            new: true
        });
        res.status(200).json({
            message: "Added",
            result: basicProfile.vaccination
        });
        next();


    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
        next(err);

    }
};



export const deleteVaccine = async (req, res,next) => {
    try {
        const patientBasicObj = await BasicProfile.findOneAndUpdate({
            patientId: mongoose.Types.ObjectId(req.params.id)
        }, {
            $pull: {
                vaccination: {
                    _id: mongoose.Types.ObjectId(req.body.vaccineId)
                }
            }
        }, {
            new: true
        })
        res.status(200).json({
            message: "Vaccine deleted!",
            result: patientBasicObj.vaccination
        });
        next();
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
        next(err);
    }
};



export const createDiseaseLabel = async (req, res,next) => {
    try {
        const patientId = mongoose.Types.ObjectId(req.params.id);
        const disease = req.body.diseaseTags;
        // console.log(patientId);

        //const disease=await DiseaseLabel.findById(diseaseId);
        console.log(disease);

        let patientBasicObj = await BasicProfile.findOne({
            patientId: patientId
        });

        let patientDisease = patientBasicObj.diseaseTags;
        console.log(patientDisease.length);
        if (patientDisease.length == 0) {
            const basicProfile = await BasicProfile.findOneAndUpdate({
                patientId: patientId
            }, {
                $set: {
                    diseaseTags: disease
                }
            }, {
                new: true
            });
            res.status(200).json({
                message: "Added",
                result: basicProfile.diseaseTags
            });


        } else {
            let result = disease.filter(v => !patientDisease.some(u => u === v));
            if (result.length > 0) {

                //patientDisease=patientDisease.concat(result);
                const basicProfile = await BasicProfile.findOneAndUpdate({
                    patientId: patientId
                }, {
                    $push: {
                        diseaseTags: result
                    }

                }, {
                    new: true
                });
                res.status(200).json({
                    message: "Added",
                    result: basicProfile.diseaseTags
                })

            } else {
                res.status(409).json({
                    message: "Disease already exist",

                })

            }

        }
        next()
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });

        next(err);
    }
};





export const deleteDisease = async (req, res,next) => {
    try {
        const patientBasicObj = await BasicProfile.findOneAndUpdate({
            patientId: mongoose.Types.ObjectId(req.params.id)
        }, {
            $pull: {
                diseaseTags: req.body.diseaseTags
            }
        }, {
            new: true
        });
        res.status(200).json({
            message: "Disease deleted!",
            result: patientBasicObj.diseaseTags
        });
        next();
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
        next(err);
    }
};



export const createBadHabits = async (req, res,next) => {
    try {
        const patientId = mongoose.Types.ObjectId(req.params.id);
        const badHabits = req.body.badHabits;

        let patientBasicObj = await BasicProfile.findOne({
            patientId: patientId
        })
        let patientBadHabits = patientBasicObj.badHabits;

        if (patientBadHabits.length == 0) {

            const basicProfile = await BasicProfile.findOneAndUpdate({
                patientId: patientId
            }, {
                $push: {
                    badHabits: badHabits
                }
            }, {
                new: true
            });
            res.status(200).json({
                message: "Added",
                result: basicProfile.badHabits
            });

        } else {
            let result = badHabits.filter(v => !patientBadHabits.some(u => u === v));
            if (result.length > 0) {
                const basicProfile = await BasicProfile.findOneAndUpdate({
                    patientId: patientId
                }, {
                    $push: {
                        badHabits: result
                    }
                }, {
                    new: true
                });
                res.status(200).json({
                    message: "Added",
                    result: basicProfile.badHabits
                });


            } else {
                res.status(409).json({
                    message: "Bad Habits already exist",
                })

            }

        }
        next();

    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
        next(err);

    }
};




export const deleteBadHabits = async (req, res,next) => {
    try {
        const patientBasicObj = await BasicProfile.findOneAndUpdate({
            patientId: mongoose.Types.ObjectId(req.params.id)
        }, {
            $pull: {
                badHabits: req.body.badHabits
            }
        }, {
            new: true
        });
        res.status(200).json({
            message: "Bad Habits deleted!",
            result: patientBasicObj.badHabits
        });
        next();
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        });
        next(err);
    }
};



export const getPatientBasicProfile = async (req, res,next) => {
  
    let patient = '';
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  
        patient = await BasicProfile.findOne({
            $or: [
                { '_id': req.params.id },
                { 'patientId': req.params.id }
              ]
        });
      } else {
  
        patient = await BasicProfile.findOne({
             puuid: req.params.id 
        });
      }
  
      res.status(200).json({
          message:"Displaying results",
          result:patient
      });
      next();
  
    } catch (err) {
      res.status(400).json({
        message: "Something went wrong",
        error:err
      });
      next(err);
    }
  
  };



  export const getPatientAllergy = async (req, res,next) => {
  
    let patient = '';
    try {
      
  
        patient = await BasicProfile.findOne({
            $or: [
                { '_id': req.params.id },
                { 'patientId': req.params.id },
                { 'puuid':req.params.id}
              ]
        }).select('allergies');
  
      res.status(200).json({
          message:"Displaying results",
          result:patient.allergies
      });
      next();
  
    } catch (err) {
      res.status(400).json({
        message: "Something went wrong",
        error:err
      });
      next(err);
    }
  
  };


  
  export const getPatientVaccines = async (req, res,next) => {
  
    let patient = '';
    try {
      
  
        patient = await BasicProfile.findOne({
            $or: [
                { '_id': req.params.id },
                { 'patientId': req.params.id },
                { 'puuid':req.params.id}
              ]
        }).select('vaccination');
  
      res.status(200).json({
          message:"Displaying results",
          result:patient.vaccination
      });
      next();
  
    } catch (err) {
      res.status(400).json({
        message: "Something went wrong",
        error:err
      });
      next(err);
    }
  
  };


   
  export const getPatientBadHabits = async (req, res,next) => {
  
    let patient = '';
    try {
      
  
        patient = await BasicProfile.findOne({
            $or: [
                { '_id': req.params.id },
                { 'patientId': req.params.id },
                { 'puuid':req.params.id}
              ]
        }).select('badHabits');
  
      res.status(200).json({
          message:"Displaying results",
          result:patient.badHabits
      });
      next();
  
    } catch (err) {
      res.status(400).json({
        message: "Something went wrong",
        error:err
      });
      next(err);
    }
  
  };

   
  export const getPatientDiseases = async (req, res,next) => {
  
    let patient = '';
    try {
      
        patient = await BasicProfile.findOne({
            $or: [
                { '_id': req.params.id },
                { 'patientId': req.params.id },
                { 'puuid':req.params.id}
              ]
        }).select('diseaseTags');
  
        res.status(200).json({
            message:"Displaying results",
            result:patient.diseaseTags
        });
        next();
  
    } catch (err) {
      res.status(400).json({
        message: "Something went wrong",
        error:err
      });
      next(err);
    }
  
  };