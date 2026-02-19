import express from 'express';
import * as boardController from './board.controller.js';

const router = express.Router();

router.post('/', boardController.createBoard);
router.get('/:id', boardController.getBoardById);
router.get('/organization/:organizationId', boardController.getBoardsByOrganizationId);

export default router;  