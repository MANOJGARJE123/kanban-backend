import express from 'express';
import * as columnController from './column.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.post('/', isAuth, columnController.createColumn);
router.get('/:id', isAuth, columnController.getColumnById);
router.put('/reorder', isAuth, columnController.reorderColumns);
router.delete('/:id', isAuth, columnController.deleteColumn);

export default router;
