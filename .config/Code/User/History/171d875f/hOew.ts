import { KeepAliveEvent } from '../config/KeepAliveEvent';

setInterval(() => KeepAliveEvent.emit('keep-alive'), 300000);
''
