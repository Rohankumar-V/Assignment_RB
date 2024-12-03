# Assignment
 
## Table of Contents
 
1. [Introduction](#introduction)
 
2. [Features](#features)
 
3. [Installation](#installation)
 
4. [Technologies Used](#technologies-used)
 
5. [Project Details](#project-details)
 
## Introduction

This project is a mobile application built using React Native. It focuses on essential user management and data handling functionalities, including Firebase Authentication, data listing, search, filters, and detailed item views. The app is optimized for clean, reusable code, a responsive UI, and a user-friendly experience. 
 
## Features
 
**Authentication:**
Login and Signup using Firebase Authentication.
Handles incorrect login credentials with appropriate error messages.

**Home Screen:**
Displays a list of items fetched from an API or mock data.
Includes search functionality to filter items by title.
Supports filtering items by year.

**Details Screen:**
Provides in-depth information about a selected item, including images and descriptions.

**Additional Features:**
Logout functionality.

 
## Installation
 
To get a local copy up and running, follow these simple steps
 
### Prerequisites
 
- Node.js
- npm
- Expo CLI
 
### Clone the Repository
 
```
git clone https://github.com/Rohankumar-V/Assignment_RB
cd Royal_Brothers
```
 
### Install Dependencies
 
```
npm install
```
 
### Running the Application
 
```
npm run android
 
```
 
## Technologies Used
 
- React Native
- Javascript
- Firebase Authentication
- Redux
- React Navigation
 
## Project Details
 
**Authentication**
-Login Screen:
    -Fields: Email, Password.
    -Firebase Authentication handles login.

-Signup Screen:
    -Fields: Email, Password, Confirm Password.
    -Includes validation for passwords and matching confirmation.
    -Firebase Authentication handles signup
    
-Logout:
    -Firebase Authentication handles logout

**Home Screen**
    -Fetches a paginated list of items (10 per page) using mock data or API.
    -Includes a search bar for filtering items by title.
    -Filters allow sorting based on attributes (e.g., category).
  
**Details Screen**
    -Shows full information about an item when clicked from the Home Screen.
    -Displays images and additional item details.

**State Management**
  -Redux is used for handling data via dummy api.
