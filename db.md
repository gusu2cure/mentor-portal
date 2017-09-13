1. Open Postico, if needed
2. Connect to your server, if needed
3. Create a new database with the name 'db_gusu'
3. Go the 'db_gusu' database you created
4. Open the SQL editor and run the following queries


CREATE DATABASE db_gusu_1;

CREATE TABLE tbl_access_lvl (
    id SERIAL PRIMARY KEY,
    access_lvl character varying(6)
);

CREATE TABLE tbl_lang (
    id SERIAL PRIMARY KEY,
    lang character varying(15)
);

CREATE TABLE tbl_rel_status (
    id SERIAL PRIMARY KEY,
    rel_status character varying(10)
);

CREATE TABLE tbl_sci_cause (
    id SERIAL PRIMARY KEY,
    sci_cause character varying(25)
);

CREATE TABLE tbl_sci_rel (
    id SERIAL PRIMARY KEY,
    sci_rel character varying(20)
);

CREATE TABLE tbl_trans_type (
    id SERIAL PRIMARY KEY,
    trans_type character varying(25)
);

CREATE TABLE tbl_visit_pref (
    id SERIAL PRIMARY KEY,
    visit_pref character varying(25)
);

CREATE TABLE tbl_user (
    email character varying(50) PRIMARY KEY,
    date_created date,
    access_lvl integer REFERENCES tbl_access_lvl,
    enabled boolean DEFAULT TRUE,
    first_name character varying(25),
    last_name character varying(35),
    dob date,
    gender character varying(20),
    phone character varying(10),
    phone_type character varying(10),
    street character varying(50),
    city character varying(30),
    state character(2),
    zip character(5),
    visit_pref integer REFERENCES tbl_visit_pref,
    sci_relation integer REFERENCES tbl_sci_rel,
    sci_cause integer REFERENCES tbl_sci_cause,
    sci_age character(2),
    sci_lvl character varying(45),
    asia_score character(1),
    mobility_req character varying(20),
    trans_type integer REFERENCES tbl_trans_type,
    rel_status integer REFERENCES tbl_rel_status,
    fam_status character varying(30),
    ed_lvl character varying(25),
    emp_work text,
    lang integer REFERENCES tbl_lang,
    pets boolean,
    hobbies text,
    password text,
    questions text,
    experience text,
    additional text,
    comments text,
    heard_about text,
    matched boolean DEFAULT FALSE,
    id serial NOT NULL,
    matched_with text,
    image character varying(250),
    user_bio text
);

<!-- START INSTRUCTIONS TO CREATE MATERIALIZED VIEW -->
1. In the db_gusu database select '+ Materialized View' at the bottom of the Postico window
2. In the 'MATERIALIZED VIEW NAME' text box type 'main_matview'
3. Copy the entire Materialzed View Definition below from line 97 to line 141
4. Paste the Materialzed View Definition into the 'MATERIALIZED VIEW DEFINITION' and save changes
<!-- END INSTRUCTIONS TO CREATE MATERIALIZED VIEW -->


<!-- START MATERIALIZED VIEW DEFINITION  -->
SELECT tbl_user.email,
    tbl_access_lvl.access_lvl,
    tbl_user.first_name,
    tbl_user.last_name,
    tbl_user.dob,
    tbl_user.gender,
    tbl_user.phone,
    tbl_user.phone_type,
    tbl_user.street,
    tbl_user.city,
    tbl_user.state,
    tbl_user.zip,
    tbl_visit_pref.visit_pref,
    tbl_sci_rel.sci_rel,
    tbl_sci_cause.sci_cause,
    tbl_user.sci_age,
    tbl_user.sci_lvl,
    tbl_user.asia_score,
    tbl_user.mobility_req,
    tbl_trans_type.trans_type,
    tbl_rel_status.rel_status,
    tbl_user.fam_status,
    tbl_user.ed_lvl,
    tbl_user.emp_work,
    tbl_lang.lang,
    tbl_user.pets,
    tbl_user.hobbies,
    tbl_user.questions,
    tbl_user.experience,
    tbl_user.additional,
    tbl_user.heard_about,
    tbl_user.matched,
    tbl_user.id,
    tbl_user.matched_with,
    tbl_user.image,
    tbl_user.user_bio,
    date_part('year'::text, age(tbl_user.dob::timestamp with time zone)) AS age
   FROM tbl_user
     LEFT JOIN tbl_access_lvl ON tbl_access_lvl.id = tbl_user.access_lvl
     LEFT JOIN tbl_lang ON tbl_lang.id = tbl_user.lang
     LEFT JOIN tbl_rel_status ON tbl_rel_status.id = tbl_user.rel_status
     LEFT JOIN tbl_sci_cause ON tbl_sci_cause.id = tbl_user.sci_cause
     LEFT JOIN tbl_sci_rel ON tbl_sci_rel.id = tbl_user.sci_relation
     LEFT JOIN tbl_trans_type ON tbl_trans_type.id = tbl_user.trans_type
     LEFT JOIN tbl_visit_pref ON tbl_visit_pref.id = tbl_user.visit_pref;
<!-- END MATERIALIZED VIEW DEFINITION  -->


INSERT INTO tbl_access_lvl
VALUES (1, 'Mentor'),
(2, 'Mentee'),
(3, 'Admin');

INSERT INTO tbl_lang
VALUES (1, 'English'),
(2, 'Hmong'),
(3, 'Somali'),
(4, 'Spanish'),
(5, 'Vietnamese'),
(99, 'Other');

INSERT INTO tbl_rel_status
VALUES (1, 'Single'),
(2, 'Married'),
(3, 'Separated'),
(4, 'Divorced'),
(5, 'Widowed'),
(6, 'Widower'),
(99, 'Other');

INSERT INTO tbl_sci_cause
VALUES (1, 'Motor Vehicle Accident'),
(2, 'Fall'),
(3, 'Alcohol'),
(4, 'Act of Violence'),
(5, 'Sport/Recreation'),
(6, 'Medical/Surgical'),
(99, 'Other');

INSERT INTO tbl_sci_rel
VALUES (1, 'Self'),
(2, 'Spouse/Partner'),
(3, 'Parent'),
(4, 'Sibling'),
(5, 'Friend'),
(6, 'Relative'),
(7, 'Caregiver'),
(8, 'Medical Professional'),
(99, 'Other');

INSERT INTO tbl_trans_type
VALUES (1, 'Personal vehicle'),
(2, 'Public transportation'),
(99, 'Other');

INSERT INTO tbl_visit_pref
VALUES (1, 'Any/All'),
(2, 'Hospital'),
(3, 'Rehabilitation Center'),
(4, 'Care Center/Nursing Home'),
(5, 'At their home'),
(6, 'Online (e.g. Skype)'),
(7, 'Phone Calls'),
(8, 'In Public'),
(99, 'Other');
