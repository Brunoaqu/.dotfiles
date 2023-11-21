import { Router } from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { sendEmailScanController } from '../../../useCases/sendEmailScan';

const notificationsRouter = Router();

notificationsRouter.post('/report-file', middleware.ensureAuthenticated(), (req, res) => sendEmailScanController.execute(req, res));

export { notificationsRouter };
