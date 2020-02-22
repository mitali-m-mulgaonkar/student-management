# Node JS students CRUD APIs
TECH Stack- Node, Express, MongoDB


# Steps to intall on local
- git clone 
- yarn
- yarn starts

## General API Information
* The base endpoint is: **/v1/students**
* All endpoints return either a JSON object or array.

## HTTP Return Codes

* HTTP `200` return codes are used for success.
* HTTP `401` return code is used when record does not exist.
* HTTP `500` return codes are used for internal errors; the issue is on
  the service side.
  
## Error Codes
Any endpoint can return an ERROR with a data for extended information.

Sample ERROR Payload:
```javascript
{
  "data": "Something went wrong"
}
```

## General Information on Endpoints
* For `GET` endpoints, parameters must be sent as a `query string`.
* For `POST`, `PUT`, and `DELETE` endpoints, the parameters must be sent as a `request body` with content type
  `application/json`. 
* Parameters may be sent in any order.

## Endpoints

This service provides the following endpoints:

| Method       | endpoint           | VERB    | Descripcion         |
| ------------ |:-------------      | :---:   | --------------------|
| [create]     | /v1/students       | POST    | creates new Student. Pass address as a array of objects                  
| [update]     | /v1/students/:id   | PUT     | Updates student and address. Pass student object with array of addresses
| [list]       | /v1/students       | GET     | Lists all the student with addresses
| [view]       | /v1/students/:id   | GET     | Returns details of a particular student along with address
| [delete]     | /v1/students/:id   | DELETE  | Removes student record


## List Students

Lists all the student with address
```
GET /v1/students/
```

**Parameters:**
```
NONE
```

**Response:**
```json
{
    "status": "success",
    "data": [
        {
            "_id": "5e510b4d4577836dfc3e401c",
            "rollNo": 1,
            "firstName": "Mitali",
            "lastName": "Mulgaonkar",
            "contactNo": 7334832343465,
            "class": 1,
            "__v": 0,
            "address": [
                {
                    "_id": "5e510b4d4577836dfc3e401d",
                    "state": "Mh",
                    "district": "Pune",
                    "landMark": "",
                    "pin": 234298,
                    "houseName": "h1",
                    "houseNumber": 1,
                    "user": "5e510b4d4577836dfc3e401c",
                    "__v": 0
                },
                {
                    "_id": "5e510b4d4577836dfc3e401e",
                    "state": "Mh",
                    "district": "Mumbai",
                    "landMark": "",
                    "pin": 46566,
                    "houseName": "h3",
                    "houseNumber": 1,
                    "user": "5e510b4d4577836dfc3e401c",
                    "__v": 0
                }
            ]
        },
        {
            "_id": "5e510b764577836dfc3e401f",
            "rollNo": 2,
            "firstName": "Shefali",
            "lastName": "Mulgaonkar",
            "contactNo": 7334832343465,
            "class": 1,
            "__v": 0,
            "address": [
                {
                    "_id": "5e510b764577836dfc3e4020",
                    "state": "Mh",
                    "district": "Pune",
                    "landMark": "",
                    "pin": 646565,
                    "houseName": "h2",
                    "houseNumber": 2,
                    "user": "5e510b764577836dfc3e401f",
                    "__v": 0
                },
                {
                    "_id": "5e510b764577836dfc3e4021",
                    "state": "Goa",
                    "district": "North",
                    "landMark": "",
                    "pin": 46566,
                    "houseName": "h3",
                    "houseNumber": 3,
                    "user": "5e510b764577836dfc3e401f",
                    "__v": 0
                }
            ]
        }
    ]
}
```

## View Student Details

View Student details
```
PUT /v1/students/5e510b4d4577836dfc3e401c
```

**Request Body:**
```
NONE
```

**Response:**
```json
{
    "status": "success",
    "data": {
        "_id": "5e510b4d4577836dfc3e401c",
        "rollNo": 1,
        "firstName": "Mitali",
        "lastName": "Mulgaonkar",
        "contactNo": 7334832343465,
        "class": 1,
        "__v": 0,
        "address": [
            {
                "_id": "5e510b4d4577836dfc3e401d",
                "state": "Mh",
                "district": "Pune",
                "landMark": "",
                "pin": 234298,
                "houseName": "h1",
                "houseNumber": 1,
                "user": "5e510b4d4577836dfc3e401c",
                "__v": 0
            },
            {
                "_id": "5e510b4d4577836dfc3e401e",
                "state": "Mh",
                "district": "Mumbai",
                "landMark": "",
                "pin": 46566,
                "houseName": "h3",
                "houseNumber": 1,
                "user": "5e510b4d4577836dfc3e401c",
                "__v": 0
            }
        ]
    }
}
```

## Create Student

Creates new student
```
POST /v1/students/
```

**Parameters:**
```json
{
	"student": {
		"rollNo": "2" ,
		"firstName": "Shefali",
		"lastName": "Mulgaonkar",
		"contactNo": "7334832343465",
		"address": [{
			"state": "Mh",
			"district": "Pune",
			"landMark": "",
			"pin": "646565",
			"houseName": "h2",
			"houseNumber": "2"
			
		},{
			"state": "Goa",
			"district": "North",
			"landMark": "",
			"pin": "46566",
			"houseName": "h3",
			"houseNumber": "3"
			
		}],
		"class": "1"
	}
}
```

**Response:**
```json
{
    "status": "success",
   
}
```

## update

Updates student record
```
PUT /v1/students/5e50f3e78c19d260c441842d
```
**Request Body:**
```json
{
   "student": {
        "_id": "5e510b764577836dfc3e401f",
        "rollNo": 2,
        "firstName": "Shefali",
        "lastName": "Mulgaonkar",
        "contactNo": 7334832343465,
        "class": 1,
        "__v": 0,
        "address": [
            {
                "_id": "5e510b4d4577836dfc3e401d",
                "state": "Mh",
                "district": "Pune",
                "landMark": "",
                "pin": 234298,
                "houseName": "h1",
                "houseNumber": 1,
              
                "deleted": true // pass deleted flag to remove address record
            },
            {
                "_id": "5e510b4d4577836dfc3e401e",
                "state": "Mh",
                "district": "Mumbai",
                "landMark": "",
                "pin": 46566,
                "houseName": "h3",
                "houseNumber": 1,
              
            },
            {
               
                "state": "Mh",
                "district": "Nashik",
                "landMark": "",
                "pin": 46566,
                "houseName": "h4",
                "houseNumber": 4, //new address record in update api
               
            }
        ]
    }
}
```

**Response:**
```json
{
    "status": "success"
   
}
```

## delete

Removes student record along with associated address records
```
DELETE /v1/students/5e510b764577836dfc3e401f
```

**Request Body:**
```NONE
```

**Response:**
```json
{
    "status": "success"
   
}
```