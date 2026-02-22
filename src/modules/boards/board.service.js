import { createBoard as createBoardRepo, getBoardById as getBoardByIdRepo, getAllBoardsOrganizationId as getAllBoardsOrganizationIdRepo, deleteBoard as deleteBoardRepo } from './board.repository.js';

export const createBoard = async (data) => {
    if (!data.name || !data.organization_id) {
        const error = new Error('Board name and organization_id are required');
        error.statusCode = 400;
        throw error;
    }

    const result = await createBoardRepo(data);
    return result;
}

export const getBoardById = async (id) => {
    const result = await getBoardByIdRepo(id);
    return result;
}

export const getAllBoardsOrganizationId = async (organizationId) => {
    const result = await getAllBoardsOrganizationIdRepo(organizationId);
    return result;
}

export const deleteBoard = async (id) => {
    const result = await deleteBoardRepo(id);
    return result;
}