import express from 'express';
import * as columnController from './column.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.post('/', isAuth, columnController.createColumn);
router.patch('/reorder', isAuth, columnController.reorderColumns);
router.delete('/:id', isAuth, columnController.deleteColumn);
router.delete('/', isAuth, columnController.deleteColumn);
router.get('/:id', isAuth, columnController.getColumnById);

export default router;
