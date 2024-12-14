//import cors and express
const cors = require('cors');
const express = require('express');
const events = require('./resources/events.js')

const app = express();
app.use(cors());
app.use(express.json());

//API End points using the imported event methods.
//get methods
app.get('/events', events.getAllEvents);
app.get('/events/:id', events.getEventByID);
app.get('/events/by-name/:name', events.getEventByName);

//post methods
app.post('/events', events.addEvent);

//put methods
app.put('/events/:id', events.updateEventByID)

//delete methods
app.delete('/events/:id', events.deleteEventByID);
app.delete('/events', events.deleteAllEvents);

//set up port to listen on then call listen function for express to run
const PORT = '3000';
app.listen(PORT, () => {
    console.log(`Express web server running on port ${PORT}`)
})