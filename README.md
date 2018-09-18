# HiredDev

![alt text](https://drive.google.com/file/d/10zwXJLvUHRnORjKf6QTrSu_Xb_ToCEUK/view?usp=sharing)

## Description

HiredDev is an ongoing project that I am working on, and it is a platform that allows users to keep their job search process organized through job tracking, notes, and search features.

Right now, this project is deployed on an AWS Beanstalk instance, and in the future, I plan on opening it up for others to use. 

## Setup

To run this project, please git clone and then, go to the client directory. When you have entered in here, run ** npm i ** to install dependencies for the React/Redux application. Then, do the same thing in the server directory to install all dependencies for the node application.

After you have done these steps, please open up two terminals. In one terminal, run npm run start in the client directory, and then, in another terminal, run npm run start in the server directory.

Note: you have to give values to the environmental variables in order for this project to work. For MONGO, set up a db or put the uri of an outside db you may be using. My favorite outside MongoDB server is MLab. For SECRET, just enter anything; this is used for security purposes.

## Finished Features

* CI/CD pipeline for easy deployment using Github, Travis CI, Docker Hub, and AWS Beanstalk
* User login/sign up
* Private routes inaccessible to users without proper credentials (bearer token)
* Ability to add jobs to dashboard
* Ability to take notes and access them for each individual job
* Ability to edit job entry to update status or add notes
* Unit Tests for API
* Created a Dark Mode for landing page

## Future Features

* Search feature to filter through jobs
* Set up text reminder for interviews
* ~~More appealing UI/UX~~
* Display only 10, 100, or all jobs on single page
* Post a congratulations message when status changes to offer

## Future

Right now, I am on the job search, so this repo may not be as active as I would hope. However, my main focus will be creating the search feature and making a more attractive user interface.

## Author(s)

* Raman Hundal [@hundalrs](http://github.com/hundalrs)

