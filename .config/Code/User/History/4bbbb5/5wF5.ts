import { Router } from 'express';
import { createMergedController } from '../../../useCases/merged/createMerged';
import { getMergedByIdController } from '../../../useCases/merged/getMergedById';
import { middleware } from '../../../../../shared/infra/http';
import { archiveGroupByIdController } from '../../../useCases/merged/archiveGroupById';
import { updateGroupByIdController } from '../../../useCases/merged/updateGroupById';
import { cacheMiddleware } from '..';

const groupRouter = Router();

groupRouter.post(
  '/',
  middleware.ensureAuthenticated(),
  cacheMiddleware.handle(),
  middleware.isCacheAvailable(),
  (req, res) => createMergedController.execute(req, res)
);
groupRouter.get('/', (req, res) => res.status(501).send('Not implemented'));
groupRouter.get('/:mergedId', middleware.ensureAuthenticated(), (req, res) =>
  getMergedByIdController.execute(req, res)
);
groupRouter.delete('/:groupId', middleware.ensureAuthenticated(), (req, res) =>
  archiveGroupByIdController.execute(req, res)
);
groupRouter.put('/:groupId', middleware.ensureAuthenticated(), (req, res) =>
  updateGroupByIdController.execute(req, res)
);

export { groupRouter };
