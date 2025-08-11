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
Tests are split into two types; component & integration tests (test/routes/auth), the latter require
Rails server thus run `setup.integration.js` which checks server is running.

#### General use
  - See test scripts defined in package.json:
    - `npm run test:components` - tests components only, i.e. no Rails server required.
    - `npm run test:integration` - tests integration tests only (/tests/routes/*), i.e. does require server.
      This script starts server, runs tests, and shuts server down. To get Rails server output in test log 
      output then add --log-to-stdout after the server start command of the `test:start-server` script.
    - `npm run:all` runs foreman which, defined in ./Procfile.test, spins up a test Rails server
      then runs ALL vitest tests.
    To run specific test files:
    - `npm run test:integration:file src/tests/path/to/file` - runs the given integration test file only.
    - `npx vitest -- src/tests/routes/auth/SignIn` But if running an integration test, which neccesarily
      requires a Rails server, you will need to start that server manually, do so with 
      `RAILS_ENV=test bin/rails server -p 3001 --log-to-stdout` on another process.
      
#### Integration tests
  - note that integration tests need to call a real, running in test env mode, rails server's
    test database. Therefore a Rails server needs to be spun up with:
    `RAILS_ENV=test bin/rails server -p 3001 --log-to-stdout` before integration tests
    can be successfully run.
  - note /src/tests/setup.js which has a beforeAll call to ensureServerReady()
      in /src/tests/utils/serverHealthCheck.js, which provides output on Rails test server status.
  - the integration tests have the /src/tests/utils/testDatabase.js module defining fetch calls to
    Rails server endpoints providing and managing fixture data. Rails has a TestController managing
    those endpoints at /app/controllers/api/test_controller.rb.

#### Component tests
  - Do not require Rails server, and have a simple setup; `setup.component.js` run by vite.config.js

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
