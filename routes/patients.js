import express from 'express';
import { create, patient, patientList, remove, removeAddress, update,updateAddress,addEmergency, updateEmergency, removeEmergency, updateProfileImage } from '../controllers/PatientsController.js'
const router = express.Router();
import upload from '../middleware/upload.js';

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
 *                 example: P00000001
 *     responses:
 *       201:
 *         description: User Information Updated
 *       403:
 *         description: Error Occured During Updating Information
 *         
 */


// POST: /api/patients/create
router.post('/create', upload.single("images"), create );

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

/**
 * @swagger
 * /api/patients/{id}/delete:
 *   delete:
 *     summary: deletes patient record.
 *     description: deletes everything 
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *               
 *     responses:
 *       201:
 *         description: Your Profile is deleted succesfully
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
 *                            example: 0
 *                          firstName:
 *                            type: string
 *                            example: Leanne 
 *                          lastName:
 *                            type: string
 *                            example: Graham 
 *                          contact:
 *                            type: string
 *                            example: +880-123-456-7890
 *                          dob:
 *                            type: date
 *                            example: 1990-10-12  
 *                          gender:
 *                            type: string
 *                            example: female 
 *                          religion:
 *                            type: string
 *                            example: long cucumber 
 *                          maritalStatus:
 *                            type: string
 *                            example: complicated 
 *                          bloodGroup:
 *                            type: string
 *                            example: O +ve 
 *                          nationality:
 *                            type: string
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
 *       403:
 *         description: Error Occured!! Failed to create profile
 *         
 */

// DELETE: /api/patients/:id/delete
router.delete('/:id/delete', remove);

/**
 * @swagger
 * /api/patients/{id}/update-address:
 *   put:
 *     summary: updates patient address.
 *     description: updates patient address. any field empty will be removed automatically and any field not passed will remain same as before
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
 *               
 *     responses:
 *       201:
 *         description: Patient Address Updated
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Displaying Results"
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:
 *                            _id:
 *                              type: string
 *                              example: 1
 *                               
 *                            country:
 *                              type: string
 *                              example: Wano
 *                            city:
 *                              type: string
 *                              example: Onigashima
 *                            area:
 *                              type: string
 *                              example: kaido's place
 *                            zipcode:
 *                              type: string
 *                              example: 1207
 *                            location:
 *                              type: object
 *                              properties:
 *                                type:
 *                                  type: string
 *                                  example: point
 *                                coordinates:
 *                                  type: array
 *                                  example: [91.1112, 84.3223]
 *       403:
 *         description: Error Occured!! Failed to create profile
 *         
 */

// PUT: /api/patients/:id/update-address
router.put('/:id/update-address', updateAddress);

/**
 * @swagger
 * /api/patients/{id}/remove-address:
 *   delete:
 *     summary: deletes patient address.
 *     description: deletes patient address 
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *               
 *     responses:
 *       201:
 *         description: Address Removed
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Address Removed
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:
 *                            _id:
 *                              type: string
 *                              example: 1
 *                               
 *                            country:
 *                              type: string
 *                              example: Wano
 *                            city:
 *                              type: string
 *                              example: Onigashima
 *                            area:
 *                              type: string
 *                              example: kaido's place
 *                            zipcode:
 *                              type: string
 *                              example: 1207
 *                            location:
 *                              type: object
 *                              properties:
 *                                type:
 *                                  type: string
 *                                  example: point
 *                                coordinates:
 *                                  type: array
 *                                  example: [91.1112, 84.3223]
 *       404:
 *         description: Error! Address does not exist
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Error! Address does not exist
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:         
 *       403:
 *         description: Error Occured!! During Removing Address
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Error Occured!! During Removing Address
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:
 */


// DELETE: /api/patients/:id/remove-address 
router.delete('/:id/remove-address', removeAddress);

/**
 * @swagger
 * /api/patients/{id}/add-emergency-contact:
 *   post:
 *     summary: add emergency contact.
 *     description: emergency contat - one or more can be added at a time 
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
 *                 emergency:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Luffy
 *                       relation:
 *                         type: string
 *                         example: mutual aquintance
 *                       contact:
 *                         type: string
 *                         example: +880-161-111-1111         
 *     responses:
 *       201:
 *         description: Emergency Contact Added
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Emergency Contact Added
 *                    result:
 *                      type: object
 *                      properties:
 *                        emergency:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              _id:
 *                                type: string
 *                                example: 1
 *                              name:
 *                                type: string
 *                                example: Luffy
 *                              relation:
 *                                type: string
 *                                example: mutual aquintance
 *                              contact:
 *                                type: string
 *                                example: +880-161-111-1111
 * 
 *       
 *       409:
 *         description: Contact already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact already exist
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */


// PUT: /api/patients/:id/add-emergency-contact
router.put('/:id/add-emergency-contact', addEmergency);

/**
 * @swagger
 * /api/patients/{id}/{emid}/update-emergency-contact:
 *   put:
 *     summary: update emergency contact.
 *     description: emergency contat - only one can be updated at a time 
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *       - in: path
 *         name: emid
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
 *                 example: Luffy
 *               relation:
 *                 type: string
 *                 example: mutual aquintance
 *               contact:
 *                 type: string
 *                 example: +880-161-111-1111         
 *     responses:
 *       200:
 *         description: Emergency Contact updated
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Emergency Contact updated
 *                    result:
 *                      type: object
 *                      properties:
 *                        emergency:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              _id:
 *                                type: string
 *                                example: 1
 *                              name:
 *                                type: string
 *                                example: Luffy
 *                              relation:
 *                                type: string
 *                                example: mutual aquintance
 *                              contact:
 *                                type: string
 *                                example: +880-161-111-1111
 * 
 *       
 *       409:
 *         description: Contact already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact already exist
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */

// PUT: /api/patients/:id/:emid/update-emergency-contact
router.put('/:id/:emid/update-emergency-contact', updateEmergency);

/**
 * @swagger
 * /api/patients/{id}/{emid}/remove-emergency-contact:
 *   delete:
 *     summary: remove emergency contact.
 *     description: emergency contat - only one can be removed at a time 
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *       - in: path
 *         name: emid
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
 *                 example: Luffy
 *               relation:
 *                 type: string
 *                 example: mutual aquintance
 *               contact:
 *                 type: string
 *                 example: +880-161-111-1111         
 *     responses:
 *       200:
 *         description: Emergency Contact Deleted
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Emergency Contact Deleted
 *                    result:
 *                      type: object
 *                      properties:
 *                        emergency:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              _id:
 *                                type: string
 *                                example: 1
 *                              name:
 *                                type: string
 *                                example: Luffy
 *                              relation:
 *                                type: string
 *                                example: mutual aquintance
 *                              contact:
 *                                type: string
 *                                example: +880-161-111-1111
 * 
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */


// DELETE: /api/patients/:id/:emid/remove-emergency-contact
router.delete('/:id/:emid/remove-emergency-contact', removeEmergency);



/**
 * @swagger
 * /api/patients/{id}/update-profile-image:
 *   put:
 *     summary: add or update profile image .
 *     description: add or update profile picture
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: string
 *                 format: binary
 *               puuid:
 *                 type: string
 *                 example: P000000001
 *     responses:
 *       200:
 *         description: Profile picture updated
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Profile picture updated
 *                    result:
 *                      type: string
 *                      example: "uploads\\patients\\img-undefined\\1627564544677.png"
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */


// PUT: /api/patients/:id/update-profile-image
router.put('/:id/update-profile-image', upload.single("images"),updateProfileImage);


export default router;