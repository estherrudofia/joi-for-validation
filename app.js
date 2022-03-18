// express with traversy
const path = require('path');
const express = require('express');
const members = require('./Members');


const app = express();

const logger = (req, res, next) => {
    console.log('Hello');
    next();
}

// Init middleware
app.use(logger);

// Gets all members
app.get('/api/members', (req, res) => {
    res.json(members);
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

