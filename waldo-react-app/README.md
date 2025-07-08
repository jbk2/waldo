# The Odin Project - React Course, [project 4](https://www.theodinproject.com/lessons/react-new-where-s-waldo-a-photo-tagging-app#project-solution): Where's Waldo?

## General description
A frontend React app "Where's Waldo" game, which features:
- User account creation and authentication
- Game timing component  - to be completed
- Game scoring, and player scoreboard tracking - to be completed
- 
_________________________________________________________________________________________________

## Technologies
- Vite created React project.
  - Hooks used; useState, useContext, useEffect, custom hooks.
- React Router
- Vitest
- Tailwind CSS & DaisyUI
_________________________________________________________________________________________________
## Configuration
- vite set up to proxy '/api' to 'http://localhost:3000' - to ensure all url calls go to Rails API app

_________________________________________________________________________________________________

## App design
- Router defined in main.jsx
   - all routes are protected apart from authentication routes

- App.jsx houses most state and business logic

- Root '/' serves homepage which:
  - if user is authenticated (session_id cookie is authenticated via /api/session )
    - renders Game component
  - if user is not authenticated (session_id cookie is authenticated via /api/session )
    - navigates to /sign-in

- AuthLayout.jsx wraps SignIn, SignUp, RequestResetPassword, ResetPassword component views
  - RequestResetPassword - where the initial request is made with account email submitted
  - ResetPassword - where the actual new password is input after received email link token is validated
  - automateic session check on app mount, sessions persist accross browser sessions

- Navbar component
  - contains CharacterStatus component, typemark, Scoreboard component, and Login/out links 
  - Character Status component renders character found/not found state
  - Scoreboard component - renders timer element

- Alert component - inserted into Dom via setAlert() function in App.jsx - renders alert messages with transition animations in and out. 

_________________________________________________________________________________________________

## Usage
### Tests
    - Run and read tests via package.json vitest script; `npm run test`

### To run the project locally:
- Clone the repository
- Run `npm install` to install the dependencies
- You must start the Rails server before running this one:
  - from the waldo-rails-app run `bin/rails server`
- Then start react server; `npm run dev`
- Open the browser and navigate to `http://localhost:5173/`

### To use the hosted app
- visit `https://www.....com`
