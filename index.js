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
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errorlogger, logger } from './middleware/logger/logger.js';
import { SwaggerOptions } from './swaggerOptions.js';



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mounting swagger from here
const swaggerDocs = swaggerJSDoc(SwaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// registering logger
app.use(logger);

// route middleware
app.use('/api/patients',patientRoutes);
app.use('/api/prescription-images', prescriptionImageRoutes);
app.use('/api/test-images', testImageRoutes);
app.use('/api/allergies', allergyRoutes);
app.use('/api/vaccine', vaccineRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/basic-info', basicMedicalInfoRoutes);
//app.use(multipart());

// static routes
app.use('/uploads',express.static('uploads'));


// Activation route
/**
 * @swagger
 * /:
 *  get:
 *      description: stating point of patient-service-api
 *      tags:
 *          - Entry Point
 *      responses:
 *          200:
 *            description: Success
 */
app.get('/:id?', (req, res,next)=>{
   
    res.status(200).json({
        title: "patient-service-api",
        status: "Active"
    });

});
app.use(errorlogger);

mongoose.connect(process.env.CONNECTION_STRING.replace('<DBPORT>', process.env.DBPORT),
{
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex: true
}, 
    () => {
    console.log("Connected To Patient Database");
});

app.listen(process.env.PORT, () => console.log(`Running On Port http://localhost:${process.env.PORT}/api-docs`));
