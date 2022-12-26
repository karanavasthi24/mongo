const database = require('./mongoSingletonConnection');

async function logEvent(event) {
    const eventsCollection = await database.getCollection('events');

    if(eventsCollection){
        await eventsCollection.insertOne(event);
    }
    else{
        res.status(500).send({ error: 'Failed to connect to database' });
    }
}

async function deleteEvent(eventName) {
    const eventsCollection = await database.getCollection('events');

    if(eventsCollection){
        await eventsCollection.deleteMany(eventName);   
    }
    else{
        res.status(500).send({ error: 'Failed to connect to database' });
    }
}
// async function getEvent(eventName){
//     const eventsCollection = await database.getCollection('events');

//     if(eventsCollection){
//         const result = await eventsCollection.findOne({name: eventName});   
//         if (result) {
//             console.log(`Found an event in the collection with the name '${eventName}':`);
//             console.log(result);
//         } else {
//             console.log(`No event found with the name '${nameOfListing}'`);
//         }
//     }
//     else{
//         res.status(500).send({ error: 'Failed to connect to database' });
//     }
// }

// async function getEventsByName(eventName) {
//     const eventsCollection = await database.getCollection('events');

//     if(eventsCollection){
//         return eventsCollection.find({name: eventName}).toArray();
//     }
//     else{
//         res.status(500).send({ error: 'Failed to connect to database' });
//     }
//   }


class Events {
    static eventHandlers = {};

    // Register an event handler
    on(eventName, callback) {
        if (!Events.eventHandlers.hasOwnProperty(eventName)){
            Events.eventHandlers[eventName] = callback;
            
        }
    }
  
    // Trigger all callbacks associated
    // with a given eventName
    async trigger(eventName) {
        await logEvent({
            name: eventName,
            handler: Events.eventHandlers[eventName],
            triggerTime: Date.now()
        });
        Events.eventHandlers[eventName]();
    }
  
    // Remove all event handlers associated
    // with the given eventName
    off(eventName) {
        console.log(Events.eventHandlers)
        delete Events.eventHandlers[eventName];
    }
  }

  let newEvent = new Events();
  newEvent.on("click", () => {
    console.log("Event: Click");
  });
  
  newEvent.on("hover", () => {
    console.log("Event: Hover");
  });
