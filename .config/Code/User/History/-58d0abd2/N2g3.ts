import Redis from 'ioredis';
import express from 'express';

const redis = new Redis(6379, 'cache');
const app = express();

app.get('/', async (req, res) => {
    const visits = await redis.incr('visits');
    res.send(`Number of visits is ${visits}`);
}

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
