const Joi = require('joi');

const express = require('express');

const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'Courses1' },
    { id: 2, name: 'Courses2' },
    { id: 3, name: 'ocourses3' }
]

app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id/', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send("The Course is not available")
    }
    res.send(course)
});



app.post('/api/courses', (req, res) => {

    const { error } = ValidationCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send("The Course is not available")
    }

    const { error } = ValidationCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course)
    res.send(course)
});

function ValidationCourse(cours) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(cours);


}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send("The Course is not available")
    }
    const index = courses.indexOf(course)
    courses.splice(index, 1)

})



const port = process.env.PORT || 3000

app.listen(port, () => console.log(port))


//put - update the existing
//post - update new










