const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
// initialize visits key
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    const visitCount = parseInt(visits, 10) + 1;
    res.send(`Number of visits is ${visitCount}`);
    client.set('visits', visitCount);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
