# Frontend ReactJS Search Bar

## Description

This project aims to recreate and deploy a search bar similar to the one found on https://www.sncf-connect.com/. The search bar provides autocomplete suggestions using the Tictactrip APIs.

## Installation

To run this project locally, follow these steps:

- Clone the repository:

`git clone https://github.com/OlgaKush512/tictactrip_test_frontend`

- Navigate to the project directory:

`cd tictactrip_test_frontend`

- Install the dependencies:

`npm install`

## Usage

To start the development server and view the project, use the following command:

`npm start`

This will launch the application in your browser at http://localhost:3000.

## APIs

The project utilizes three APIs to provide autocomplete suggestions for the search bar:

1. Retrieves city suggestions based on user input. Replace "par" with the user's input.

2. Retrieves the 5 most popular cities.

3. Retrieves the 5 most popular cities departing from Paris. Replace "paris" with the desired city.

## Deployment

https://tictactrip-test.vercel.app/

## Testing

`npm test`

## Coverage

`npm test -- --coverage`

## Documentation

The documentation is directly written in the files using the JSDoc format.