const express = require('express');
const app = express();

const redis = require('redis');
const redisClient = redis.createClient({
    url: 'redis://redis:6379',
    legacyMode: true,
});

app.get('/', function(req, res) {
    redisClient.get('numVisits', function(err, numVisits) {
        numVisitsToDisplay = parseInt(numVisits);
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
       res.send('Number of visits is: ' + numVisitsToDisplay);
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

app.listen(3000, async function() {
    await redisClient.connect();
    console.log('Web application is listening on port 3000');
});