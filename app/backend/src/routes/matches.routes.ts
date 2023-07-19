import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middlewares/validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.matchResult(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.insertMatch(req, res),
);

export default router;
