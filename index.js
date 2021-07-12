import express from 'express';
import patientRoutes from './routes/patients.js';
import testRoutes from './routes/tests.js';
// import appointmentRoutes from './routes/appointments.js';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route middleware
app.use('/api/patients', patientRoutes);
app.use('/api/tests', testRoutes);
// app.use('/api/resources', resourceRoutes);
// app.use('/appointments', appointmentRoutes);
// routes

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
    console.log("Connected To Patinet Database");
});

app.listen(process.env.PORT, () => console.log(`Running On Port http://localhost:${process.env.PORT}`));
