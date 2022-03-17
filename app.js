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
    if(!ids) res.status(404).send('The course with the given ID was not found'); 
    res.status(200).send(ids);
});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate({req:req.body});
    console.log(result);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`App running at ${port}`); });
