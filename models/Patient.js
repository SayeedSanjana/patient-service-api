import mongoose from 'mongoose';

const reqString = {
    type:String,
    trim:true,
    required:true,
    minlength:3,
    maxlength:50,
};
const opString = {
    type:String,
    maxlength:50,
};
const opMediumString = {
    type:String,
    maxlength:255,
};

const opNidString = { // optional string
    type: String,
    minlength:10,
    maxlength:20,
};

const reqDate = {
    type:Date,
    required:true
};

const reqContactString = {
    type:String,
    required:true,
    trim:true,
    minlength:11,
    maxlength:17,
};
const puuidString = {
    type:String,
    unique:true,
    required:true,
    trim:true,
    minlength:9,
    maxlength:9,
};

//========================================================================================================================
//Emergency Contact Schema
const emergencySchema = mongoose.Schema({
        name:reqString,
        relation:reqString,
        contact:reqContactString
},
{timestamps:true}
);

//========================================================================================================================
// geo location schema 
const geoSchema = mongoose.Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
});

//========================================================================================================================
// Patient Schema holding general information
const patientSchema = mongoose.Schema({
    
    puuid: puuidString,
    //profilePic:[opMediumString],
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
    address:{
        // addressType:reqString, // present(0), permanant(1) or history(2)
        country:reqString,
        city:reqString,
        area:reqString,
        zipcode:reqString,
        location:geoSchema,
        // district:reqString,
    },
    images:[String]
    
},{timestamps:true});

// patientSchema.createIndexes({puuid:1,unique:true})

export const Patient = mongoose.model('Patients',patientSchema);
//========================================================================================================================
//address log independent schema for internal tracking of info
// const addressLogSchema = mongoose.Schema({
//     patientId:{type: mongoose.Types.ObjectId, ref: 'Patients'},
//     addressType: reqString,
//     country:reqString,
//     city:reqString,
//     area:reqString,
//     zipcode:reqString,
//     location:geoSchema,
// });
// export const AddressLog = mongoose.model('AddressLog', addressLogSchema);
//========================================================================================================================



// Basic Profile Schema of the patient holding info on Vaccination, Bad Habits, Allergies



// allergy schema as well as dictionary table of allergies
const allergySchema = mongoose.Schema({
    
    name:reqString,
    
},{timestamps:true});

export const Allergy = mongoose.model('Allergy', allergySchema);

//========================================================================================================================
// Vaccine Schema as well as dictionary table 
const vaccineSchema = mongoose.Schema({
    
    name: reqString,
    type:reqString,
    dose:reqString,
    ICD_10_CM:reqString,
    
},{timestamps:true});

export const Vaccine = mongoose.model('Vaccine', vaccineSchema);

//========================================================================================================================
// Disease Labels
const diseaseLabelSchema = mongoose.Schema({
    
    name:reqString
    
},{timestamps:true});

export const DiseaseLabel = mongoose.model('DiseaseLabel',diseaseLabelSchema);

//========================================================================================================================
// Basic Profile Schema
const basicProfileSchema = mongoose.Schema({
    patientId:{type: mongoose.Schema.Types.ObjectId, ref: 'Patients'}, // referring _id from Patient
    puuid: puuidString,  
    
    vaccination:[
        {
            //_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine'},
            //_id:false,
            name:reqString,
            type:reqString,
            dose:reqString,
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
            _id:false,
            //_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Allergy'},
            name:reqString,
            reason:opString
        }
    ],
    badHabits:[String],
    diseaseTags: [String] // labels of diseases 
    
},{timestamps:true});

export const BasicProfile = mongoose.model('BasicProfile',basicProfileSchema);

//========================================================================================================================