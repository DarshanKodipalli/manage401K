CREATE DATABASE IF NOT EXISTS manage401K;

USE manage401K;

CREATE TABLE IF NOT EXISTS company_details(
    c_name VARCHAR(512) NOT NULL,
    c_cin VARCHAR(512) NOT NULL PRIMARY KEY,
    c_address VARCHAR(512) NOT NULL,
    c_owner VARCHAR(512) NOT NULL,
    c_contact_number VARCHAR(512) NOT NULL,
    c_contact_email VARCHAR(512) NOT NULL,
    c_password VARCHAR(512) NOT NULL,
    c_industry_type VARCHAR(512) NOT NULL,
    c_created_date DATE NOT NULL,
    c_created_by VARCHAR(512) NOT NULL,
    c_status int(11) NOT NULL,
    c_role VARCHAR(512) NOT NULL DEFAULT "company",
    c_zip VARCHAR(512) NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_details(
    e_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    e_name VARCHAR(512) NOT NULL,
    e_company_id VARCHAR(512) NOT NULL,
    e_ssn VARCHAR(512) NOT NULL,
    e_address VARCHAR(512) NOT NULL,
    e_salary DOUBLE NOT NULL,
    e_contact_number VARCHAR(512) NOT NULL,
    e_contact_email VARCHAR(512) NOT NULL,
    e_password VARCHAR(512) NOT NULL,
    e_401K_contribution DOUBLE NOT NULL,
    e_company_name VARCHAR(512) NOT NULL,
    e_created_date DATE NOT NULL,
    e_created_by VARCHAR(512) NOT NULL,
    e_status int(11) NOT NULL,
    e_role VARCHAR(512) NOT NULL DEFAULT "employee",
    e_dept VARCHAR(512) NOT NULL
);

CREATE TABLE IF NOT EXISTS monthly_wages(
    m_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    m_company_name VARCHAR(512) NOT NULL,
    m_company_id VARCHAR(512) NOT NULL,
    m_employee_ssn VARCHAR(512) NOT NULL,
    m_salary DOUBLE NOT NULL,
    m_contribution_to_401k DOUBLE NOT NULL,
    m_created_date DATE NOT NULL,
    m_created_by VARCHAR(512) NOT NULL,
    e_email VARCHAR(512) NOT NULL,
    e_name VARCHAR(512) NOT NULL,
    blockchain_transaction_id VARCHAR(512) NOT NULL,
    m_status int(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS login(
    l_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    l_email_id VARCHAR(512) NOT NULL,
    l_access_token VARCHAR(512) NOT NULL,
    l_login_date DATETIME NOT NULL,
    l_otp int(11) NOT NULL
);

COMMIT;