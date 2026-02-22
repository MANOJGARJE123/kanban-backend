import { createColumn as createColumnRepo, getColumnById as getColumnByIdRepo, getColumnsByBoardId as getColumnsByBoardIdRepo, updateColumnPosition as updateColumnPositionRepo, deleteColumn as deleteColumnRepo } from './column.repository.js';

export const createColumn = async (data) => {
    const result = await createColumnRepo(data);
    return result;
};

export const getColumnById = async (id) => {
    const result = await getColumnByIdRepo(id);
    return result;
};

export const getColumnsByBoardId = async (boardId) => {
    const result = await getColumnsByBoardIdRepo(boardId);
    return result;
};

export const reorderColumns = async (columns) => {
    const results = [];
    for (let col of columns) {
        const result = await updateColumnPositionRepo(col.id, col.position);
        results.push(result);
    }
    return results;
};

export const deleteColumn = async (id) => {
    const result = await deleteColumnRepo(id);
    return result;
};
