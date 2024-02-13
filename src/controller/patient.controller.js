import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import log from "../logging/logger.js";
import QUERY from "../query/patient.query.js";

export const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  N0_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export const getPatients = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching patients`);
  database.query(QUERY.SELECT_PATIENTS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No patients found"
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Patients retrieved",
            { patients: results }
          )
        );
    }
  });
};


export const createPatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, creating patients`);
  database.query(
    QUERY.CREATE_PATIENT,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        log.error(error.message);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              "couldn't create patient"
            )
          );
      } else {
        const patient = {
          id: results.insertedId,
          ...req.body,
          created_at: new Date(),
        };
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              "Patient Created",
              { patient }
            )
          );
      }
    }
  );
};


export const getSinglePatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching single patients`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} was not found`
          )
        );
    } else {
      const patient = {
        id: results.insertedId,
        ...req.body,
        created_at: new Date(),
      } //This patient object is one way to send back the data,but we're deceidng to retreive everything from our database instead

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Patient Retrieved",
            results[0]
          )
        );
    }
  });
};


export const updatePatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching single patients`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} was not found`
          )
        );
    } else {
      log.info(`${req.method} ${req.originalUrl}, updating patients`);
      database.query(
        QUERY.UPDATE_PATIENT,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          // .then((updateResults) => {
          //   return database.query(QUERY.SELECT_PATIENT, [req.params
          //     .id]); // Return the updated patient information
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  "Patient Retrieved",
                  { id: req.params.id, ...req.body }
                )
              );
          } else {
            log.error(error.message)
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  `Server Error Occured `
                )
              );
          }
        }
      );
    }
  });
};

export const deletePatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, deleting patients`);
  database.query(QUERY.DELETE_PATIENT,[req.params.id], (error, results) => {
    if (results.affectedRows > 0 ) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Patient deleted",results[0]
          )
        );
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patients by id ${req.params.id} was not found`,
          )
        );
    }
  });
};