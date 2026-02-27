import { 
    createTask as createTaskRepo,
    getTasks as getTasksRepo,
    updateTask as updateTaskRepo,
    moveTask as moveTaskRepo, 
    deleteTask as deleteTaskRepo, 
    assignTask as assignTaskRepo,
    fetchUserTasks as fetchUserTasksRepo,
    getTaskOfColumn as getTaskOfColumnRepo
} from './task.repository.js';

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
    if (!boardId) {
        const error = new Error('boardId is required');
        error.statusCode = 400;
        throw error;
    }
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

export const assignTask = async (taskId, userId) => {
    if (!taskId || !userId) {
        const error = new Error('taskId and userId are required');
        error.statusCode = 400;
        throw error;
    }

    const result = await assignTaskRepo(taskId, userId);
    return result;
}

export const fetchUserTasks = async (userId) => {
    if (!userId) {
        const error = new Error('userId is required');
        error.statusCode = 400;
        throw error;
    }

    const result = await fetchUserTasksRepo(userId);  
    return result;
}

export const getTaskOfColumn = async (columnId) => {
    if (!columnId) {
        const error = new Error('columnId is required');
        error.statusCode = 400;
        throw error;
    }

    const result = await getTaskOfColumnRepo(columnId);
    return result;
}
