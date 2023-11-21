import Redis from 'ioredis';
import express from 'express';

const redis = new Redis(6379, 'cache');
const app = express();

async function cachePostRequestBody(req: any, res: any, next: any) {
  const token = !!req.token ? req.token : 'no-token';
  const key = `post:${req.originalUrl}:${token}`;
  const body = JSON.stringify(req.body);

  await redis.set(key, body, 'EX', 10);
}

let visits = 0;
const requests: any = [];

app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(express.json({ limit: '200mb' }));
app.use(async (req, res, next) => {
  visits += 1;
  next();
});

app.get('/visits', async (req, res) => {
  res.json({ msg: `Number of visits is ${visits}` });
});

app.post('/', cachePostRequestBody, async (req, res) => {
  requests.push(req.body);
  res.json({ msg: 'Data saved' });
});

app.get('/', async (req, res) => {
  res.json(requests);
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});