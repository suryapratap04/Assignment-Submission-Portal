# Assignment Submission Portal (Backend)


### Introduction 

This Repositories Contain the Backend code for the Assignment submission portal where uesrs can submit their assignments to the admin they wanted.


Deployed Backend Link

https://assignment-submission-portal-x36f.onrender.com


## Prerequisites 

Before you begin this guide you'll need the following

1) TypeScript
2) Nodejs(Express)
3) MongoDB(mongoose)
4) Some Part of Authentication


## Steps to Locally Set up the Project 



## Step 1 Clone the Repo



```nginx
git clone https://github.com/suryapratap04/Assignment-Submission-Portal.git
```

## Step 2 Change Directory and Install Dependencies



```nginx
cd Assignment-Submission-Portal/ && npm install
```

## Step 3 Copy the content to .env
```nginx
cp .env.example .env
```

## Step 4 Build the Project 
```nginx
npm run build
```
## Step 5 Start the Project  



```nginx
npm run start
```

## Step 6 Check in the Browser or by the Postman  



```nginx
http://localhost:4000
```


### Checkout All the Api Endpoints

## 1) Register The User/Admin
This endpoint takes the userName, email, userType, password as the input to register 


```nginx 
http://localhost:4000/api/v1/register
```

## 2) Login the User
this endpoint takes the email and Password as the body



```nginx
http://localhost:4000/api/v1/login
```

## 3) Get all the Admins 
this is the GET endpoint that takes no input parameter
```nginx
http://localhost:4000/api/v1/admins
```

## 4) User to Upload the Assignment
this endpoint takes the UserID ,task and the Admin ID as the input parameter
```nginx
http://localhost:4000/api/v1/upload
```
## 5) Admin to Check-out All the Assignments
this endpoint takes the userid of the admin after the token verification 

```nginx
http://localhost:4000/api/v1/assignments
```

## 6) Admin to Accept and Reject the Assignment
this endpoint takes the id of the assignment 
```nginx
http://localhost:4000/api/v1/assignments/:id/accept
```
```nginx
http://localhost:4000/api/v1/assignments/:id/reject
```
