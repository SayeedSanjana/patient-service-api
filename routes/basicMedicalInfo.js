import express from 'express';
import { createAllergy,createVaccine,createDiseaseLabel, createBadHabits,deleteAllergy,deleteVaccine,deleteDisease,deleteBadHabits} from '../controllers/BasicMedicalInfoController.js'
const router = express.Router();
import upload from '../middleware/upload.js';



/**
 * @swagger
 * /api/basic-info/{patientId}/create-allergy:
 *  post:
 *      summary: Represents all patient's allergies
 *      description: add patient's allergies 
 *      tags:
 *          - Patient Basic Medical Info
 *      parameters:
 *        - in: path
 *          name: patientId
 *          required: true
 *          description: alpha numeric ID of the user to retrieve.
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allergies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Penicillin
 *                     reason:
 *                       type: string
 *                       example: Penicillin makes me sick 
 *      responses:
 *          200:
 *            description: Allergy added to patient
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Displaying Results"
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Penicillin
 *                          reason:
 *                            type: string
 *                            example: Penicillin makes me sick
 *          409:
 *            description: Allergy already exist
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Allergies already exist"
 *          400:
 *            description: Bad Request
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Something went wrong"
 *                    error:
 *                      type: object
 *                      example: {}       
 */

// POST: /api/basic-info/create-allergy
router.post('/:patientId/create-allergy', createAllergy);


/**
 * @swagger
 * /api/basic-info/{id}/delete-allergy:
 *   delete:
 *     summary: deletes patient allergy.
 *     description: deletes patient allergy 
 *     tags:
 *       - Patient Basic Medical Info
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Penicillin    
 *     responses:
 *       200:
 *         description: Allergy Removed
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Allergy Removed
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Dermatitis
 *                          reason:
 *                            type: string
 *                            example: This is dermatitis                                 
 *       400:
 *         description: Error Occured
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Something went wrong
 *                    result:
 *                      type: string
 *                      example: {}                   
 */

// DELETE: /api/basic-info/:id/delete-allergy
router.delete('/:id/delete-allergy', deleteAllergy);



/**
 * @swagger
 * /api/basic-info/{id}/create-vaccine:
 *  post:
 *      summary: Represents all patient's vaccination records
 *      description: add patient's vaccine 
 *      tags:
 *          - Patient Basic Medical Info
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: alpha numeric ID of the user to retrieve.
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vaccine:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Influenza
 *                     type:
 *                       type: string
 *                       example: viral
 *                     dose:
 *                       type: string
 *                       example: three
 *                     date:
 *                       type: string
 *                       example: 2021-7-19
 *                     dosage:
 *                       type: string
 *                       example: 7
 *                     administeredBy:
 *                       type: string
 *                       example: Iktisad
 *                     registration:
 *                       type: string
 *                       example: 12345678
 *      responses:
 *          200:
 *            description: Vaccine added to patient
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Added"
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Influenza
 *                          type:
 *                            type: string
 *                            example: viral
 *                          dose:
 *                            type: string
 *                            example: three
 *                          date:
 *                            type: string
 *                            example: 2021-7-19
 *                          dosage:
 *                            type: string
 *                            example: 7
 *                          administeredBy:
 *                            type: string
 *                            example: Iktisad
 *                          registration:
 *                            type: string
 *                            example: 12345678
 *          400:
 *            description: Bad Request
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Something went wrong"
 *                    error:
 *                      type: object
 *                      example: {}       
 */


// POST: /api/basic-info/:id/create-vaccine
router.post('/:id/create-vaccine', createVaccine)


/**
 * @swagger
 * /api/basic-info/{id}/delete-vaccine:
 *   delete:
 *     summary: deletes patient vaccine.
 *     description: deletes patient vaccine
 *     tags:
 *       - Patient Basic Medical Info
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vaccineId:
 *                 type: string
 *                 example: 60fd587ab0b12e30f46f5ecd  
 *     responses:
 *       200:
 *         description: Allergy Removed
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Allergy Removed
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Influenza
 *                          type:
 *                            type: string
 *                            example: viral
 *                          dose:
 *                            type: string
 *                            example: three
 *                          date:
 *                            type: string
 *                            example: 2021-7-19
 *                          dosage:
 *                            type: string
 *                            example: 7
 *                          administeredBy:
 *                            type: string
 *                            example: Iktisad
 *                          registration:
 *                            type: string
 *                            example: 12345678                               
 *       400:
 *         description: Error Occured
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Something went wrong
 *                    result:
 *                      type: string
 *                      example: {}                   
 */


// DELETE: /api/basic-info/:id/delete-vaccine
router.delete('/:id/delete-vaccine', deleteVaccine);




/**
 * @swagger
 * /api/basic-info/{id}/create-diseaseLabel:
 *  post:
 *      summary: Represents all patient's disease tags
 *      description: add patient's disease
 *      tags:
 *          - Patient Basic Medical Info
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: alpha numeric ID of the user to retrieve.
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diseaseTags:
 *                 type: array
 *                 example: [Colon Cancer,High Blood Pressure]
 *      responses:
 *          200:
 *            description: Disease Tags added to patient
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Added"
 *                    result:
 *                      type: array
 *                      example: [High Blood Pressure, Colon Cancer]
 *                      
 *          400:
 *            description: Bad Request
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Something went wrong"
 *                    error:
 *                      type: object
 *                      example: {}  
 *          409:
 *            description: Disease already exist
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Disease already exist"
 *                    
 */

// POST: /api/basic-info/:id/create-diseaseLabel
router.post('/:id/create-diseaseLabel', createDiseaseLabel);



/**
 * @swagger
 * /api/basic-info/{id}/delete-disease:
 *   delete:
 *     summary: deletes patient disease tags.
 *     description: deletes patient disease tags
 *     tags:
 *       - Patient Basic Medical Info
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diseaseTags:
 *                 type: string
 *                 example: Diabetes
 *     responses:
 *       200:
 *         description: Disease Tags Removed
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Disease Removed
 *                    result:
 *                      type: array
 *                      example: [Blood Cancer, Colon Cancer]                              
 *       400:
 *         description: Error Occured
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Something went wrong
 *                    result:
 *                      type: string
 *                      example: {}                   
 */

// DELETE: /api/basic-info/:id/deleteDisease
router.delete('/:id/delete-disease', deleteDisease);


/**
 * @swagger
 * /api/basic-info/{id}/create-badHabits:
 *  post:
 *      summary: Represents all patient's bad habits
 *      description: add patient's bad habits
 *      tags:
 *          - Patient Basic Medical Info
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: alpha numeric ID of the user to retrieve.
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               badHabits:
 *                 type: array
 *                 example: [Smoking,Sleeping,Eating]
 *      responses:
 *          200:
 *            description: Bad Habits added to patient
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Added"
 *                    result:
 *                      type: array
 *                      example: [Smoking, Sleeping]
 *                      
 *          400:
 *            description: Bad Request
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Something went wrong"
 *                    error:
 *                      type: object
 *                      example: {}  
 *          409:
 *            description: Bad Habits already exist
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Bad Habits already exist"
 *                    
 */



// POST: /api/basic-info/:id/create-badHabits
router.post('/:id/create-badHabits', createBadHabits);




/**
 * @swagger
 * /api/basic-info/{id}/delete-badHabits:
 *   delete:
 *     summary: deletes patient bad habits.
 *     description: deletes patient bad habits
 *     tags:
 *       - Patient Basic Medical Info
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               badHabits:
 *                 type: string
 *                 example: Sleeping
 *     responses:
 *       200:
 *         description: Bad Habits Removed
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Bad Habits Removed
 *                    result:
 *                      type: array
 *                      example: [Smoking, Eating]                              
 *       400:
 *         description: Error Occured
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Something went wrong
 *                    result:
 *                      type: string
 *                      example: {}                   
 */

// DELETE: /api/basic-info/:id/delete-badHabits
router.delete('/:id/delete-badHabits', deleteBadHabits);

export default router;
