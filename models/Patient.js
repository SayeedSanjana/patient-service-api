import mongoose from 'mongoose';

const reqString = {
    type:String,
    trim:true,
    required:true,
    maxlength:50,
    minlength:3,
};
const opString = {
    type:String,
    maxlength:50,
};

const opString = {
    type:String,
    maxlength:50,
};
const opNidString = { // optional string
    type: String,
    minlength:10,
    maxlength:20,
};

const reqDate = {
    type:Date,
    //required:true
};

const reqContactString = {
    type:String,
    required:true,
    trim:true,
    minlength:11,
    maxlength:17,
};

//========================================================================================================================
//Emergency Contact Schema
const emergencySchema = mongoose.Schema({
        name:reqString,
        relation:reqString,
        contact:reqContactString
});

//========================================================================================================================
// Patient Schema holding general information
const patientSchema = mongoose.Schema({
    // uuid:"",
    // profilePic:"",
    puuid: reqString,
    firstName: reqString,
    lastName: opString,
    contact:reqContactString,
    dob:reqDate,
    gender:reqString,
    religion:reqString,
    maritalStatus:reqString,
    bloodGroup:reqString,
    nid:opNidString,
    nationality:reqString,
    emergency:[emergencySchema],
    address:[
        {
            addressType:reqString, // present or permanant
            country:reqString,
            city:reqString,
            area:reqString,
            location:reqString,
            // district:reqString,
        }
    ],
    
},{timestamps:true});


export const Patient = mongoose.model('Patients',patientSchema);
//========================================================================================================================
// Basic Profile Schema of the patient holding info on Vaccination, Bad Habits, Allergies

// allergy schema 
const allergySchema = mongoose.Schema({
    
    name:reqString,
    
},{timestamps:true});

export const Allergy = mongoose.model('Allergy', allergySchema);

//========================================================================================================================
// Vaccine Schema
const vaccineSchema = mongoose.Schema({
    
    name: reqString,
    type:reqString,
    dose:reqString,
    gap:String,
    ICD_10_CM:reqString,
    
},{timestamps:true});

export const Vaccine = mongoose.model('Vaccine', vaccineSchema);

//========================================================================================================================
// Disease Labels
const diseaseLabelSchema = mongoose.Schema({
    
    name:reqString,
    reason: opString,
    
},{timestamps:true});

export const DiseaseLabel = mongoose.model('DiseaseLabel',diseaseLabelSchema);

//========================================================================================================================
// Basic Profile Schema
const basicProfileSchema = mongoose.Schema({
    patientId:{type: mongoose.Schema.Types.ObjectId, ref: 'Patients'},   // referring _id from Patient
    
    vaccination:[
        {
            _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine'},
            date : reqDate,
            registrationNo:Number,
            dosage:Number,
            administeredBy:reqString,   // healthcare institute or doctor name
            nextDosage:reqDate,
            //images:[String]          // need to have a validation number instead of an image
        }, 
    ],
    allergies:[
        {
            _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Allergy'},
            reason:opString,
        }
    ],
    badHabits:[String],
    diseaseTags: [diseaseLabelSchema] // labels of diseases 
    
},{timestamps:true});

export const BasicProfile = mongoose.model('BasicProfile',basicProfileSchema);

//========================================================================================================================