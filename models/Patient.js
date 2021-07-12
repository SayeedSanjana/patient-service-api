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
    minlength:3,
    maxlength:50,
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
    required:true,
    trim:true,
    minlength:11,
    maxlength:17,
};

const patientSchema = mongoose.Schema({
    // uuid:"",
    // profilePic:"",
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