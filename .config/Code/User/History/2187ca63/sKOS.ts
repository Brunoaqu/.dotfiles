import { Router } from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { sendEmailScanController } from '../../../useCases/sendEmailScan';

const notificationsRouter = Router();

notificationsRouter.post('/scan', middleware.ensureAuthenticated(), (req, res) => sendEmailScanController.execute(req, res));

export { notificationsRouter };
w
