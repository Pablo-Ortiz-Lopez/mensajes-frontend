# Mensajes APP	

This is a simple React App which serves the sole purpose of using the Mensajes API in an effortless manner.

You can either run the app locally, or use the deployed version on [my personal VPS](https://parkink.cat/mensajes) , which can be used directly.

## Running locally

### Requisites

To use this App Locally, you need to have:

* `npm` or (preferably) `yarn` installed on your machine. 
* The `mensajes-api` REST API running locally in your machine.

### How to run

To run the app, first you will need to install dependencies, executing either `npm install` or `yarn install` depending on your preferred package manager.

Then, simply execute  `npm start` or `yarn start`.

The app will open in your default browser automatically.

## Build the app

You can also build the app to serve it statically in a server. 

In production mode, the App is configured to use the deployed API at `https://parkink.cat:3000` . You can change that before building in the  `src/constants.js` file.

To build it, run `yarn run build` , and find the built App in the `build` folder.