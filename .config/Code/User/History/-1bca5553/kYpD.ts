// Configuration
import 'reflect-metadata';
import 'dotenv/config';

// Infrastructure
import './shared/infra/database/knex/config/config';
import './shared/infra/database/ioredis/redisClient';
import './shared/infra/http/app';

// Subscriptions
import './modules/notifications/subscriptions';
import './modules/reports/subscriptions';
import './modules/transactions/subscriptions';
