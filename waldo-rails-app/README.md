# README
# The Odin Project - React Course, [project 4](https://www.theodinproject.com/lessons/react-new-where-s-waldo-a-photo-tagging-app#project-solution): Where's Waldo?

## Environment:
- Ruby 3.3.0
- Rails 8.0.2
- Uses Rails default SQlite3

## Technologies/Libraries
- Rails
- Uses Rails 8 authentication. (2 blog posts I wrote on the subject, linked below):
  - [part1](https://dev.to/jbk2/rails-8-authentication-via-a-react-frontend-26fo)
  - [part2](https://dev.to/jbk2/rails-8-authentication-password-reset-mechanics-4jc2)
_________________________________________________________________________________________________

## General description

This is the waldo-rails-app, Rails API app, backend application, which serves /api/ namespaced endpoints for the sakes of the frontend waldo-react-app.*:
_________________________________________________________________________________________________

## App design
- Images have_many Characters, which belong_to images
- Characters have start and end x & y attributeds which define their location in percentage relative to their parent image's x & y dimensions
_________________________________________________________________________________________________
## API
Offers the following endpoints, for the purposes of user (account) creation and authentication:

APISessionsController
- GET - /api/session >> Sessions controller's #show action
- POST - /api/session >> Sessions controller's #create action
- DELETE - /api/session >> Sessions controller's #delete action

APIPasswordsController
- POST - /api/passwords >> Passwords controller's #create action
- PATCH - /api/passwords >> Passwords controller's #update action

APIUsersController
- POST - /api/users >> User controller's #create action

### Rails app served views:
- The app serves views designed for administrators to:
  - create Waldo images & set its character locations >> /images/new (set as root)
  - view images in the db >> /images/3
  - edit images >> not yet built

### Other features:
- authentication backed with password reset via mailer - as per Rails 8 auth paradigm
- 

_________________________________________________________________________________________________

## Usage
  ### Tests
    - Run and read tests with `rspec`

  ### To run the project locally:
...

  ### To use the hosted app
...

## DB Seeding
- In order to seed a fresh db the seeds.rb uses hard coded image and character data, and expects the image files to be located in from rails root ../waldo-game-imgs
- It will not seed create images or games if there are any present at all already