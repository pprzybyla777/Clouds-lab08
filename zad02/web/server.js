const express = require('express');
const app = express();

app.use(express.json());

const redis = require('redis');
const redisClient = redis.createClient({
    url: 'redis://redis:6379',
    legacyMode: true,
});

app.get('/', function(req, res) {
    res.send("Hello!")
});

app.get('/message', function(req, res) {

    const { key } = req.query;

    if (key) {

        redisClient.get(key, function(err, value) {
            return res.status(200).json({value: value})
        })

    } else {
        return res.status(400).json({message: "You have to query key!"});
    }

});

app.post('/message', async function(req, res) {

    const { key, value } = req.body;

    if (!key || !value ) {
        return res.status(400).json({ message: "All fields are required." });
    }

    await redisClient.set(key, value);

    return res.status(201).json({message: "Operation was successful"});

});

app.listen(3000, async function() {
    await redisClient.connect();
    console.log('Web application is listening on port 3000');
});