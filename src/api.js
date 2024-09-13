const express = require('express');
const { emitEvent } = require('./socket');

function createApp() {
  const app = express();
  app.use(express.json());

  // API Route
  app.post('/event', (req, res) => {
      const apiToken = req.headers['authorization'];
      
      const { event } = req.body;
    
      if (apiToken !== process.env.API_TOKEN) {
        return res.status(403).send('Forbidden');
      }
    
      if (!process.env.EVENTS.split(',').includes(event)) {
        return res.status(400).send('Event not found or not enabled');
      }
    
      emitEvent(event)
      res.send('Event emitted');
  });
    
  return app;
}
  

module.exports = { createApp };
