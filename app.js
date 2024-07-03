//Importing the express module
const express = require('express');
//Creating an instance of express
const app = express();

//Importing the third-party middleware Morgan
const morgan = require('morgan');
//Logging every request to the console in 'dev' format
app.use(morgan('dev'));

//Importing the middleware Body Parser
const bodyParser = require('body-parser');
//Parses JSON-encoded request bodies and makes them available under req.body
app.use(bodyParser.json());

//Setting up the two basic routes (a root route and an about route)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('This is an example of a JavaScript file using Express.js');
});

//Middleware to handle non-existent routes with the 'not found' error message (404)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

//Middleware to catch any errors that occur during the handling of requests
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//Configure the server to listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
