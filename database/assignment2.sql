-- assignment2.sql
-- Task 1: 6 single queries for the course database

-- 1) Insert Tony Stark
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2) Modify the Tony Stark record to change account_type to 'Admin'
UPDATE account
SET account_type = 'Admin'
WHERE account_id = (
SELECT account_id FROM account WHERE account_email = 'tony@starkent.com' LIMIT 1
);

-- 3) Delete the Tony Stark record
DELETE FROM account
WHERE account_id = (
SELECT account_id FROM account WHERE account_email = 'tony@starkent.com' LIMIT 1
);

-- 4) Modify the "GM Hummer" record
UPDATE inventory
SET inv_description = replace(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = (
SELECT inv_id FROM inventory WHERE inv_make = 'GM' AND inv_model = 'Hummer' LIMIT 1
);

-- 5) Use an inner join for `sport` category
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';


-- 6) Update all records to add `/vehicles`
UPDATE inventory
SET inv_image = replace(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = replace(inv_thumbnail, '/images/', '/images/vehicles/');

