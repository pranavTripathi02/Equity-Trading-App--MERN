Run the following command in both directories frontend/ and backend/
```
$npm i
```
In the backend/ directory, run populate.js using command `$node populate.js`


Create a .env file in the backend/ directory with the following details:

-MONGO_URI = link to your MongoDB cluster

-PORT = port on which to run the back-end 

-JWT_SECRET = algorithm to create encoded and signed payload ( use 81B4D6481C8850A3BCE04DF45380E1A8D8675075975F0B34B60D1D1EA858FEC4 )

-JWT_LIFETIME = expiration time of the token ( use 30d )

-MAILTRAP_HOST = link to your MailTrap smtp server

-MAILTRAP_USER= MailTrap Username

-MAILTRAP_PASS= MailTrap Password

-MAILTRAP_PORT= MailTrap Port


Run the following command in both directories frontend/ and backend/
```
$npm start
```
