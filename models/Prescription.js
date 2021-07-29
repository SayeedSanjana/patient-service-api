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
const opMediumString = { // optional String
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
const puuidString = {
    type:String,
    unique:true,
    required:true,
    trim:true,
    minlength:9,
    maxlength:9,
};

const prescriptionImageSchema = mongoose.Schema({
    // uuid:"",
    // profilePic:"
   //Patient Uploaded Presription Image
    // id will later be added to this module
    puuid:puuidString, 
    title:reqString,
    description: opMediumString,
    prescribedBy: opString,
    date: reqDate,
    images:[String],
    
    
},{timestamps:true});

export const PrescriptionImage = mongoose.model('PrescriptionImage',prescriptionImageSchema);