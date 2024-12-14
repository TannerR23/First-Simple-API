//import db constant
const db = require('../db.js');

//Event object for handling data fields
const Event = function(data){
    this.name = data.name;
    this.description = data.description;
    this.startdate = data.startdate;
    this.enddate = data.enddate;
}

//Method to add an event to the DB
Event.addEvent = (req, res) => {
    //Check we have data to be added
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty'});
        return;
    }
    //Create a new event object
    const newEvent = new Event(req.body);
    //Insert into the database
    db.query('INSERT INTO events SET ?', newEvent, (error, results) => {
        if(error){
            res.status(500).send(`Error occured while creating new event: ` + error);
            return;
        }
        res.send({id: results.insertId, ...newEvent});
    });
}

//Method to retrieve all events
Event.getAllEvents = (req, res) => {
    db.query('SELECT * FROM events', (error, results) => {
        if(error){
            res.status(500).send('Error retrieving appointments');
            return;
        }
        res.status(200).send(results);
    });
}

//Method to get an event by name
Event.getEventByName = (req, res) => {
    db.query('SELECT * FROM events WHERE name = ?', req.params.name, (error, results) => {
        if(error){
            res.status(500).send(`Error retrieving appointments where id = ${req.params.id}`);
            return;
        }
        res.status(200).send(results);
    });
}

//method to get an event by ID
Event.getEventByID = (req, res) => {
    db.query('SELECT * FROM events WHERE id = ?', req.params.id, (error, results) => {
        if(error){
            res.status(500).send(`Error retrieving appointments where id = ${req.params.id}`);
            return;
        }
        res.status(200).send(results);
    });
}

//Method to update an event by ID
Event.updateEventByID = (req, res) => {
    //Check we have data to be updated
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty'});
        return;
    }
    //create a new event object with the updated data
    const updatedEvent = new Event(req.body);
    //Set row to new data
    db.query ('UPDATE events SET ? WHERE id =? ', [updatedEvent, req.params.id], (error, results) => {
        if (error) {
            res.status(500).send('An error occurred while updating the event\n' + error);
            return;
        }
        res.status(200).send({id: req.params.id, ...updatedEvent});
    });
}

//Method to delete an event by ID
Event.deleteEventByID = (req, res) => {
    db.query('DELETE FROM events WHERE id = ?', req.params.id, (error, results) => {
        if (error) {
            res.status(500).send('An error occurred while deleting events');
            return;
        }
        res.status(200).send(results);
    });
}

//Method to delete all events in the DB
Event.deleteAllEvents = (req, res) => {
    db.query('DELETE FROM events', (error, results) => {
        if (error) {
            res.status(500).send('An error occurred while deleting events');
            return;
        }
        res.status(200).send(results);
    });
}

//Export event
module.exports = Event;
