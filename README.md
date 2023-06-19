# REST-API
This repository contains a RESTful API that I have developed using node.js, express.js, and Python (for unit testing) for the database I've used MongoDB atlas.
This API is REStful Web Services that allow the development of a client application for managing your daily costs like food, health, housing, etc..
Adding A cost is used with the POST method and the API call looks like this:
{'user_id':123123,'year':"2023",'month':3,'day':2,'description':'milk 9','category':'food','sum':'8'}
The report accepts a month year and user id and returns all of the expenses of that month using the GET method, the API call looks like this:
/URL/report/?user_id=123123&year=2023&month=3
