import mongoose from 'mongoose';

const reqString = {
    type:String,
    trim:true,
    required:true,
    maxlength:50,
    minlength:3,
};
const reqDate = {
    type:Date,
    //required:true
};
const testSchema = mongoose.Schema({
    patientId:reqString,
    patientUuid:{
        type:String,
        maxlength:10,
        minlength:10,
        required:true,
    },
    pTestImage:[                        //Patient Uploaded Test Image
        {
            title:reqString,
            description:reqString,
            suggestedBy:reqString,
            date:reqDate,
            path:reqString,

        }
    ]       
},{timestamps:true});

export const Test = mongoose.model('Test',testSchema);