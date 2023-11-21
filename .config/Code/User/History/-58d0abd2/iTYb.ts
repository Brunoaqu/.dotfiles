import Redis from 'ioredis';
import express from 'express';

const redis = new Redis(6379, 'cache');

redis.set("mykey", "value");

redis.get("mykey", (err, result) => {
  console.log(result);
});


