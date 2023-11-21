import { Router } from 'express';
import { createScanController } from '../../../useCases/scan/createScan';
import { middleware } from '../../../../../shared/infra/http';
import { archiveScanByIdController } from '../../../useCases/scan/archiveScanById';
import { getScanReportByController } from '../../../useCases/scan/getScanReportById';
import { updateScanByIdController } from '../../../useCases/scan/updateScanById';

const scanRouter = Router();

scanRouter.post(
  '/',
  middleware.ensureAuthenticated(),
  middleware.cacheRequestBody(),
  middleware.isCacheAvailable(),
  (req, res) => createScanController.execute(req, res)
);
scanRouter.get('/', (req, res) => res.status(501).send('Not implemented.'));
scanRouter.get('/:scanId', middleware.ensureAuthenticated(), (req, res) =>
  getScanReportByController.execute(req, res)
);
scanRouter.delete('/:scanId', middleware.ensureAuthenticated(), (req, res) =>
  archiveScanByIdController.execute(req, res)
);
scanRouter.put('/:scanId', middleware.ensureAuthenticated(), (req, res) =>
  updateScanByIdController.execute(req, res)
);

export { scanRouter };
