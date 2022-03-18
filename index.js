const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const courses = [
    {
        id: 1,
        name: 'course 1'
    },
    {
        id: 2,
        name: 'course 2'
    }
]

app.get('/', (req, res) => {
    res.send('courses');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const ids = courses.find(c => c.id === parseInt(req.params.id));
    if (!ids) return res.status(404).send('The course with the given ID was not found'); 
    res.status(200).send(ids);
});

app.post('/api/courses', (req, res) => { 
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    
    courses.push(course);
    res.send(course);
});


//for updating, we are dealing with a specific course
app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const ids = courses.find(c => c.id === parseInt(req.params.id));
    if (!ids) return res.status(404).send('The course with the given ID was not found'); 
    
    //validate
    const { error } = validateCourse(req.body); // for result.error
    
    //If invalid, return 404 - Bad request
    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    ids.name = req.body.name;
    
    // Return the updated course
    res.send(ids);
});


app.delete('/api/courses/:id', (req, res) => {
    //Look up the course with the given ID
    //Not existing, return 404
    const ids = courses.find(c => c.id === parseInt(req.params.id));
    if (!ids) return res.status(404).send('The course with the given ID was not found'); 
    // Delete
    const index = courses.indexOf(ids);
    courses.splice(index, 1);
    //Return the same course
    res.send(ids);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    
    return schema.validate(course);
   
}



const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`App running at ${port}`); });


