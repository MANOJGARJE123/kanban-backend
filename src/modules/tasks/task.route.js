import express from 'express';
import * as taskController from './task.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.post('/', isAuth, taskController.createTask);
router.get('/', isAuth, taskController.getTasks);
router.patch('/move', isAuth, taskController.moveTask);
router.patch('/:id', isAuth, taskController.updateTask);
router.delete('/:id', isAuth, taskController.deleteTask);
router.post('/assign', isAuth, taskController.assignTask);
router.get('/user/:userId', isAuth, taskController.fetchUserTasks);
router.get('/column/:columnId', isAuth, taskController.getTaskOfColumn);

export default router;
