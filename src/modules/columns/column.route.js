import express from 'express';
import * as columnController from './column.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.get('/board/:boardId', isAuth, columnController.fetchColumnsOfBoard);

router.post('/', isAuth, columnController.createColumn);
router.patch('/reorder', isAuth, columnController.reorderColumns);
router.get('/:id', isAuth, columnController.getColumnById);
router.delete('/:id', isAuth, columnController.deleteColumn);

export default router;
