import express from 'express';
import patientRoutes from './routes/patients.js';
import prescriptionImageRoutes from './routes/prescriptionImgage.js';
// import appointmentRoutes from './routes/appointments.js';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route middleware
app.use('/api/patients', patientRoutes);
app.use('/api/prescriptions', prescriptionImageRoutes);
// app.use('/appointments', appointmentRoutes);
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
