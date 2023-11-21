import Redis from 'ioredis';
import express from 'express';

const redis = new Redis(6379, 'cache');
const app = express();

app

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
