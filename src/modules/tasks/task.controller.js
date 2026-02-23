import * as taskServices from './task.service.js';

export const createTask = async (req, res, next) => {
    try {
        const data = await taskServices.createTask(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { boardId, columnId } = req.query;
        const data = await taskServices.getTasks(boardId, columnId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const data = await taskServices.updateTask(req.params.id, req.body);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const moveTask = async (req, res, next) => {
    try {
        const { taskId, column_id, position } = req.body;
        const data = await taskServices.moveTask(taskId, column_id, position);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const data = await taskServices.deleteTask(taskId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};
