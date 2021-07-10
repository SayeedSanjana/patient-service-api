import mongoose from 'mongoose';

const reqString = {
    type:String,
    trim:true,
    maxlength:50,
    minlength:3,
    required:true
};

const opNidString = { // optional string
    type: String,
    minlength:10,
    maxlength:20,
}

const reqDate = {
    type:Date,
    //required:true
};

const reqContactString = {
    type:String,
    trim:true,
    maxlength:17,
    minlength:11,
    required:true
};

const patientSchema = mongoose.Schema({
    // uuid:"",
    // profilePic:"",
    firstName: reqString,
    lastName: reqString,
    contact:reqContactString,
    dob:reqDate,
    gender:reqString,
    religion:reqString,
    maritalStatus:reqString,
    bloodGroup:reqString,
    nid:opNidString,
    nationality:reqString,
    emergency:[
        {
            name:reqString,
            relation:reqString,
            contact:reqContactString
        }
    ],
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
    uuid:{
        type:String,
        maxlength:10,
        minlength:10,
        required:true,
        

    }
},{timestamps:true});

export const Patient = mongoose.model('Patients',patientSchema);