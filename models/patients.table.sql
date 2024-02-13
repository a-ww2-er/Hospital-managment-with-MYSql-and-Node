-- Table for Patients
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('M', 'F', 'Other') NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15)
);


