# Transfer

## Project Overview

Calculates distance between two coordinates

## Features

---

### Users

- View All location
- View single location
- Create location
- Update location
- delete location
- get distance between two locations


## Technologies Used

- [NodeJS](https://nodejs.org/en/download/)
- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [PostgreSQL]

## Getting Started

---

### Installing/Run locally

- Make sure you have `nodejs`, `postgres` installed.
-

  ```bash
    - git clone https://github.com/victor-shagor/distance-calc.git
    - cd distance-calc
    - npm install/yarn
    - Create/configure `.env` environment with the following credentials
      DATABASE_URL
    - Run `npm start/yarn start` to start the server
  ```

### Testing

- To test or consume the API locally, you can make use of [_Postman_](https://www.getpostman.com) to simulate a front-end client.
- You can also test by running `npm test`.

### Endpoints

- Get /location gets all location
- Get /location/:id gets a location by id 
- Post /location creates new location
- Delete /location/:id deletes location by id
- Patch /location/:id update location by id
- Get /location/distance get distance between two location

## HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `POST` Create a data
- `GET` Create data
- `PATCH` Edit data
- `DELETE` delete data

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `Created` The request was successfully created
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `404` `Not found` The supplied API credentials are not found


