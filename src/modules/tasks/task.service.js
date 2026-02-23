import { createTask as createTaskRepo, getTasks as getTasksRepo, updateTask as updateTaskRepo, moveTask as moveTaskRepo, deleteTask as deleteTaskRepo } from './task.repository.js';

export const createTask = async (data) => {
    if (!data.title || !data.column_id || data.position === undefined) {
        const error = new Error('Task title, column_id, and position are required');
        error.statusCode = 400;
        throw error;
    }

    const result = await createTaskRepo(data);
    return result;
};

export const getTasks = async (boardId, columnId) => {
    const result = await getTasksRepo(boardId, columnId);
    return result;
};

export const updateTask = async (id, data) => {
    if (!data.title) {
        const error = new Error('Task title is required');
        error.statusCode = 400;
        throw error;
    }

    const result = await updateTaskRepo(id, data);
    return result;
};

export const moveTask = async (id, column_id, position) => {
    if (!column_id || position === undefined) {
        const error = new Error('column_id and position are required');
        error.statusCode = 400;
        throw error;
    }

    const result = await moveTaskRepo(id, column_id, position);
    return result;
};

export const deleteTask = async (id) => {
    const result = await deleteTaskRepo(id);
    return result;
};
