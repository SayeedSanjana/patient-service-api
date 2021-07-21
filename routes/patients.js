import express from 'express';
import { create, patient, patientList, remove, update,updateAddress } from '../controllers/PatientsController.js'
const router = express.Router();

/**
 * @swagger
 * /api/patients:
 *  get:
 *      summary: Represents all user
 *      description: returns all the patient users
 *      tags:
 *          - Patients
 *      responses:
 *          200:
 *            description: list of all patient users
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
 *                          _id:
 *                            type: integer
 *                            description: The user ID.
 *                            example: 0
 *                          firstName:
 *                            type: string
 *                            description: The user's first name.
 *                            example: Leanne 
 *                          lastName:
 *                            type: string
 *                            description: The user's last name.
 *                            example: Graham 
 *                          contact:
 *                            type: string
 *                            description: The user's contact.
 *                            example: +880-123-456-7890 
 *                          dob:
 *                            type: date
 *                            example: 1990-10-12  
 *                          gender:
 *                            type: string
 *                            description: The user's gender.
 *                            example: female 
 *                          religion:
 *                            type: string
 *                            description: The user's religion.
 *                            example: long cucumber 
 *                          maritalStatus:
 *                            type: string
 *                            description: The user's marital status.
 *                            example: complicated 
 *                          bloodGroup:
 *                            type: string
 *                            description: The user's contact.
 *                            example: O +ve 
 *                          nationality:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: no mans land 
 *                          emergency:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                _id:
 *                                  type: string
 *                                  example: 1
 *                                name:
 *                                  type: string
 *                                  example: Luffy
 *                                relation:
 *                                  type: string
 *                                  example: mutual aquintance
 *                                contact:
 *                                  type: string
 *                                  example: +880-161-111-1111
 *                          address:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                  type: string
 *                                  example: 1
 *                               
 *                                country:
 *                                  type: string
 *                                  example: Wano
 *                                city:
 *                                  type: string
 *                                  example: Onigashima
 *                                area:
 *                                  type: string
 *                                  example: kaido's place
 *                                zipcode:
 *                                  type: string
 *                                  example: 1207
 *                                location:
 *                                  type: object
 *                                  properties:
 *                                    type:
 *                                      type: string
 *                                      example: point
 *                                    coordinates:
 *                                      type: array
 *                                      example: [91.1112, 84.3223]
 *                          puuid:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: P0000001
 *  
 * 
 */

// GET: /api/patients
router.get('/', patientList);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Retrieve a single patient user.
 *     description: Retrieve a single patient user based on id or puuid.
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 * 
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
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
 *                          _id:
 *                            type: integer
 *                            description: The user ID.
 *                            example: 0
 *                          firstName:
 *                            type: string
 *                            description: The user's first name.
 *                            example: Leanne 
 *                          lastName:
 *                            type: string
 *                            description: The user's last name.
 *                            example: Graham 
 *                          contact:
 *                            type: string
 *                            description: The user's contact.
 *                            example: +880-123-456-7890
 *                          dob:
 *                            type: date
 *                            example: 1990-10-12  
 *                          gender:
 *                            type: string
 *                            description: The user's gender.
 *                            example: female 
 *                          religion:
 *                            type: string
 *                            description: The user's religion.
 *                            example: long cucumber 
 *                          maritalStatus:
 *                            type: string
 *                            description: The user's marital status.
 *                            example: complicated 
 *                          bloodGroup:
 *                            type: string
 *                            description: The user's contact.
 *                            example: O +ve 
 *                          nationality:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: no mans land 
 *                          emergency:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                _id:
 *                                  type: string
 *                                  example: 1
 *                                name:
 *                                  type: string
 *                                  example: Luffy
 *                                relation:
 *                                  type: string
 *                                  example: mutual aquintance
 *                                contact:
 *                                  type: string
 *                                  example: +880-161-111-1111
 *                          address:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                  type: string
 *                                  example: 1
 *                               
 *                                country:
 *                                  type: string
 *                                  example: Wano
 *                                city:
 *                                  type: string
 *                                  example: Onigashima
 *                                area:
 *                                  type: string
 *                                  example: kaido's place
 *                                zipcode:
 *                                  type: string
 *                                  example: 1207
 *                                location:
 *                                  type: object
 *                                  properties:
 *                                    type:
 *                                      type: string
 *                                      example: point
 *                                    coordinates:
 *                                      type: array
 *                                      example: [91.1112, 84.3223]
 *                          puuid:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: P0000001
 */

// GET: /api/patients/:id
router.get('/:id', patient);


/**
 * @swagger
 * /api/patients/create:
 *   post:
 *     summary: creates general info of patients.
 *     description: when called creates a general profile for the corresponding patients
 *     tags:
 *       - Patients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: Leanne 
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Graham 
 *               contact:
 *                 type: string
 *                 description: The user's contact.
 *                 example: +880-123-456-7890 
 *               dob:
 *                 type: date
 *                 example: 1990-10-12 
 *               gender:
 *                 type: string
 *                 description: The user's gender.
 *                 example: female 
 *               religion:
 *                 type: string
 *                 description: The user's religion.
 *                 example: long cucumber 
 *               maritalStatus:
 *                 type: string
 *                 description: The user's marital status.
 *                 example: complicated 
 *               bloodGroup:
 *                 type: string
 *                 description: The user's contact.
 *                 example: O +ve 
 *               nationality:
 *                 type: string
 *                 description: The user's nationality.
 *                 example: no mans land 
 *               emergency:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Luffy
 *                     relation:
 *                       type: string
 *                       example: mutual aquintance
 *                     contact:
 *                       type: string
 *                       example: +880-161-111-1111
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     example: Wano
 *                   city:
 *                     type: string
 *                     example: Onigashima
 *                   area:
 *                     type: string
 *                     example: kaido's place
 *                   zipcode:
 *                     type: string
 *                     example: 1207
 *                   location:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: point
 *                       coordinates:
 *                         type: array
 *                         example: [91.1112, 84.3223]
 *               puuid:
 *                 type: string
 *                 description: The user's nationality.
 *                 example: P0000001
 *     responses:
 *       201:
 *         description: User Information Updated
 *       403:
 *         description: Error Occured During Updating Information
 *         
 */


// POST: /api/patients/create
router.post('/create', create);

/**
 * @swagger
 * /api/patients/{id}/update:
 *   put:
 *     summary: updates general info of patients.
 *     description: when called updates a general profile of the patients except profile picture, emergency contact and address
 *     tags:
 *       - Patients
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
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: Leanne 
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Graham 
 *               contact:
 *                 type: string
 *                 description: The user's contact.
 *                 example: +880-123-456-7890 
 *               dob:
 *                 type: date
 *                 example: 1990-10-12 
 *               gender:
 *                 type: string
 *                 description: The user's gender.
 *                 example: female 
 *               religion:
 *                 type: string
 *                 description: The user's religion.
 *                 example: long cucumber 
 *               maritalStatus:
 *                 type: string
 *                 description: The user's marital status.
 *                 example: complicated 
 *               bloodGroup:
 *                 type: string
 *                 description: The user's contact.
 *                 example: O +ve 
 *               nationality:
 *                 type: string
 *                 description: The user's nationality.
 *                 example: no mans land 
 *               
 *     responses:
 *       201:
 *         description: Your General Information has been updated
 *       403:
 *         description: Error Occured!! Failed to update information
 *         
 */


// PUT: /api/patients/:id/update
router.put('/:id/update', update);

// DELETE: /api/patients/:id/delete
router.delete('/:id/delete', remove);

// PUT: /api/patients/:id/update-address
router.put('/:id/update-address', updateAddress);

// // PUT: /api/patients/:id/update Emergency
// router.get('/:id/emId/update-emergency', updateEmergency);

export default router;