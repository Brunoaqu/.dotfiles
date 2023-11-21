import { EventEmitter } from 'stream';
import { log } from '../../../../utils/bunyan/log';
import { knex } from './config';

const KeepAliveEvent = new EventEmitter();

KeepAliveEvent.on('keep-alive', () => {
  log.debug(`[Database] Keep-alive event emitted.`);

  knex.raw('SELECT 1+1 as result;').catch(() => {
    log.error(`[Database] Keep-alive event failed.`);
  });
});
