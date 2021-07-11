import mongoose from 'mongoose';

const reqString = {
    type:String,
    trim:true,
    required:true,
    maxlength:50,
    minlength:3,
};

const reqMediumString = {
    type:String,
    trim:true,
    required:true,
    maxlength:255,
};
const opDescString = { // optional String
    type:String,
    trim:true,
    maxlength:255,
};

const opString = { // optional String
    type:String,
    trim:true,
    maxlength:50,
};

const reqDate = {
    type:Date,
    default: Date.now,
    //required:true
};

const prescriptionSchema = mongoose.Schema({
    // uuid:"",
    // profilePic:"
   //Patient Uploaded Presription Image
    // id will later be added to this module
    pPrescriptionImage:[

        {   
            title:reqString,
            description: opDescString,
            prescribedBy: opString,
            date: reqDate,
            path:[String]
        }
    ]
    
},{timestamps:true});

export const Prescription = mongoose.model('Prescriptions',prescriptionSchema);