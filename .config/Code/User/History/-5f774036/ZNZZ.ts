const databaseEventEmitter = new EventEmitter();
databaseEventEmitter.on('keep-alive', () => {
  log.debug(`[Database] Keep-alive event emitted.`);

  knex.raw('SELECT 1+1 as result;').catch(() => {
    log.error(`[Database] Keep-alive event failed.`);
  });
});
