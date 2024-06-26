# Proposal for Travel Journey App

## Overview
The Ventur app aims to provide users with a platform to document their past trips, share experiences, and read reviews from fellow travelers. The app will allow users to create accounts, add details of their previous trips including pictures and reviews, and browse through reviews left by other users.

## ERD
<img width="1287" alt="Screenshot 2024-04-08 at 3 41 15 PM" src="https://github.com/nebstech/Ventur/assets/156877357/d51de7f7-7a8e-4e21-9166-0487a062d75c">


## Routes
<img width="1044" alt="Screenshot 2024-04-08 at 2 30 52 PM" src="https://github.com/nebstech/Ventur/assets/156877357/3ec79e4d-bbd9-4616-abf5-e3442065e01a">



## Logo

![Ventur app logo](https://github.com/nebstech/Ventur/assets/156877357/7b933eae-8c9c-4fbe-b9af-4ff302b61866)

## Login / Sign-up Page
<img width="1402" alt="Screenshot 2024-04-08 at 10 07 07 AM" src="https://github.com/nebstech/Ventur/assets/156877357/c7049db8-4014-4425-a4a2-f20ebaa879db">

## Activity Feed / Home Page
<img width="816" alt="Screenshot 2024-04-08 at 10 32 34 AM" src="https://github.com/nebstech/Ventur/assets/156877357/a0fe7255-bb83-4f10-8405-ac73221cdfd1">

#### MVP Goals

As a user, I want to be able to create an account and log in securely so that I can access the app.
As a user, I want to be able to add details of my previous trips including destination, date, description, and images so that I can document my travel experiences.
As a user, I want to be able to browse through reviews left by other users so that I can read about their travel experiences and get recommendations for future trips.

#### Stretch Goals

As a user, I want to be able to save trips i'm interested in for later viewing.
As a user, I want to be able to be able to customize my profile.
As a user, I want to be able to search for trips based on destination, date, or keywords so that I can easily find relevant reviews and information.
As a user, I want to be able to leave reviews for the trips I have taken, including ratings and comments, so that I can share my experiences with other users.

# Features

## User Authentication
Users will be able to sign up for an account and log in securely.

Authentication middleware will be implemented to protect routes requiring user authentication.

## Trip Management
Users can add details of their previous trips including destination, date, description, and images.

Users will have the ability to edit or delete their own trips.


## Review System
Users can leave reviews for the trips they have taken.

Reviews will include ratings and comments.

Users will be able to view reviews left by other users.

## Search and Browse

Users can search for trips based on destination, date, or keywords.

Users can browse through a list of all trips or filter them based on various criteria.

# Development Roadmap


| Day        |   | Task                                                                |
|------------|---|-------------------------------------------------------------------- |
| Monday     |   | Proposal + Develop user signup, login, and logout routes &          |
|            |   | functionalities.                                                    |
| Tuesday    |   | Work on MongoDB schema design for users and trips.                  |
|            |   | Implement CRUD operations for trips.                                |
| Wednesday  |   | Implement APIs for adding, editing, and deleting trips.             |
| Thursday   |   | Design MongoDB schema for reviews.                                  |
|            |   | Implement APIs for adding and fetching reviews.                     |
| Friday     |   | Develop frontend components for displaying trip details and reviews.|
|            |   | Test and refine search and browse functionalities.                  |
| Saturday   |   | Conduct thorough testing of the application.                        |
|            |   | Deploy the backend on a cloud platform.                             |
| Sunday     |   | Final checks, optimizations, and review.                            |
