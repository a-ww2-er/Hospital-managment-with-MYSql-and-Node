const PATIENT_QUERY = {
  //Sits a good practice to limit data we fetch from tables , thats what LIMIT 100 does
  SELECT_PATIENTS: "SELECT * FROM patients ORDER BY created_at DESC LIMIT 100",
  SELECT_PATIENT: "SELECT * FROM patients WHERE id = ?",
  CREATE_PATIENT:
    "INSERT INTO patients(first_name,last_name,email,address,diagnosis,phone,image_url) VALUES (?,?,?,?,?,?,?)",
  //Here we're updating the properties to the values coming in ( thats the ?) then 'WHERE' tells it where we're making this changes, in our case its where any patient id equal our value for id coming in
  UPDATE_PATIENT:"UPDATE patients SET first_name = ? ,last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, image_url = ? WHERE id = ?",
   DELETE_PATIENT: "DELETE FROM patients WHERE id = ?",
};

export default PATIENT_QUERY