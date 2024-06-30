// backend/routes/dialogflowRoute.js
const express = require('express');
const router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

const projectId = process.env.DIALOGFLOW_PROJECT_ID;

router.post('/', async (req, res) => {
  const sessionId = uuid.v4();
  const { message } = req.body;

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    console.log('Dialogflow request:', request); // Log request
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log('Dialogflow response:', result); // Log response
    res.json({ response: result.fulfillmentText });
  } catch (err) {
    console.error('Dialogflow API Error:', err); // Log error
    res.status(500).send('Error communicating with Dialogflow');
  }
});

module.exports = router;
