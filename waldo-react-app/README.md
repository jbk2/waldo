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


-----------------------
### Tests
#### Integration test envrironment
  - note that integration tests need to call a real, running in test env mode, rails server's
    test database. Therefore a Rails server needs to be spun up with:
    `RAILS_ENV=test bin/rails server -p 3001 --log-to-stdout` before integration tests
    can be successfully run.
  - note /src/tests/setup.js which has a beforeAll call to ensureServerReady()
      in /src/tests/utils/serverHealthCheck.js, which provides output on Rails test server status.
  - the integration tests have the /src/tests/utils/testDatabase.js module defining fetch calls to
    Rails server endpoints providing and managing fixture data. Rails has a TestController managing
    those endpoints at /app/controllers/api/test_controller.rb.

#### General
  - See test scripts defined in package.json:
    - `npm run test` runs foreman which, defined in ./Procfile.test, spins up a test Rails server
      then runs ALL vitest tests.
    - `npm run test:run` just runs vitest, enabling you to give only specific test files to run,
      e.g. `npm run test:run -- src/tests/routes/auth/SignIn`
-----------------------

### To run the project in dev mode locally:
- Clone the repository
- Run `npm install` to install the dependencies
- You must start the Rails server before running this one:
  - with terminal at the root of waldo-rails-app run `bin/rails server`
- Then start react server; `npm run dev`
  - with terminal at the root of waldo-react-app run `bin/rails server`
- Open the browser and navigate to the react server at `http://localhost:5173/`

### To use the hosted app
- visit `https://www.....com`
