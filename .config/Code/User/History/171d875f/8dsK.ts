import { databaseEventEmitter } from '../config/keepAlive';

setInterval(() => databaseEventEmitter.emit('keep-alive'), 300000);
