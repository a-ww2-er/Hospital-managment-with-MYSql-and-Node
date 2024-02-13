import express from 'express';
import { getPatients,createPatient,getSinglePatient,deletePatient,updatePatient } from '../controller/patient.controller';

const patientRoutes = express.Router();

// Defining GET and POST requests for the "/" route
patientRoutes.route("/").get(getPatients).post(createPatient);

patientRoutes.route("/:id").get(getSinglePatient).put(updatePatient).delete(deletePatient)

export default patientRoutes