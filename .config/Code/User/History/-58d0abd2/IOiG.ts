import Redis from 'ioredis';
import express from 'express';

const redis = new Redis(6379, 'cache');
const app = express();

let visits = 0;

app.use(express.json({ limit: '200mb', extended: true }));

app.get('/', async (req, res) => {
  visits += 1;
  res.send({ msg: `Number of visits is ${visits}` });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
