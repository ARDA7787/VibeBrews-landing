-- You can run this command using the default postgres (aka superuser) user created by postgres:
-- psql -U postgres -f <path to>/Create_mysabr_DB.sql

-- DROP ROLE mysabruser;
CREATE ROLE mysabruser WITH INHERIT LOGIN REPLICATION PASSWORD 'mysabrpass';

-- DROP DATABASE mysabrdb;

--Set DB encoding to UTF8. We are not bound to a particular locale, so setting 
--the locale config to use standard ISO C. 
--Using template 0 to create the database, as template 1 will force one to use 
--the system locale for db creation and throw an error if we specify standard ISO C. 

CREATE DATABASE mysabrdb
  WITH OWNER = mysabruser
       ENCODING = 'UTF8'
       LC_COLLATE = 'C'
       LC_CTYPE = 'C'
       TEMPLATE template0;
