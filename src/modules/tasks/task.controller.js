import * as taskServices from './task.service.js';

export const createTask = async (req, res, next) => {
    try {
        const data = await taskServices.createTask(req.body);
        res.status(201).json({ success: true, message: "Task created successfully", data });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { boardId, columnId } = req.query;
        const data = await taskServices.getTasks(boardId, columnId);
        res.status(200).json({ success: true, message: "Tasks fetched successfully", data });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const data = await taskServices.updateTask(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Task updated successfully", data });
    } catch (error) {
        next(error);
    }
};

export const moveTask = async (req, res, next) => {
    try {
        const { taskId, column_id, position } = req.body;
        const data = await taskServices.moveTask(taskId, column_id, position);
        res.status(200).json({ success: true,  message: "Task moved successfully", data });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const data = await taskServices.deleteTask(taskId);
        res.status(200).json({ success: true,  message: "Task deleted successfully",data });
    } catch (error) {
        next(error);
    }
};

export const assignTask = async (req, res, next) => {
    try {
        const {taskId, userId} = req.body;
        const data = await taskServices.assignTask(taskId, userId);
        res.status(200).json({ success: true, message: "Task assigned successfully", data });
    } catch (error) {
        next(error);
    }
};

export const fetchUserTasks = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const data = await taskServices.fetchUserTasks(userId);
        res.status(200).json({ success: true, message: "User tasks fetched successfully", data });
    } catch (error) {
        next(error);
    }
};

export const getTaskOfColumn = async (req, res, next) => {
    try {
        const columnId = req.params.columnId;
        const data = await taskServices.getTaskOfColumn(columnId);
        res.status(200).json({ success: true, message: "Tasks of column fetched successfully", data });
    } catch (error) {
        next(error);
    }
}