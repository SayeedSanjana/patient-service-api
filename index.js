import express from 'express';
import patientRoutes from './routes/patients.js';
import prescriptionImageRoutes from './routes/prescriptionImgage.js';
import testImageRoutes from './routes/testImage.js';
import allergyRoutes from './routes/allergies.js';
import vaccineRoutes from './routes/vaccine.js';
import diseaseRoutes from './routes/diseaseLabel.js';
import basicMedicalInfoRoutes from './routes/basicMedicalInfo.js';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

//import multipart from ('connect-multiparty');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route middleware
app.use('/api/patients', patientRoutes);
app.use('/api/prescription-images', prescriptionImageRoutes);
app.use('/api/test-images', testImageRoutes);
app.use('/api/allergies', allergyRoutes);
app.use('/api/vaccine', vaccineRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/basic-info', basicMedicalInfoRoutes);
//app.use(multipart());

// routes
app.use('/uploads',express.static('uploads'));

// Activation route
app.get('/', (req, res)=>{
    res.send('Yo I m active');
    console.log('Yo I m active');   
});
mongoose.connect(process.env.CONNECTION_STRING.replace('<DBPORT>', process.env.DBPORT),
{
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    useFindAndModify: false
}, 
    () => {
    console.log("Connected To Patient Database");
});

app.listen(process.env.PORT, () => console.log(`Running On Port http://localhost:${process.env.PORT}`));
