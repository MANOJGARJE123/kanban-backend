import { createBoard as createBoardRepo, getBoardById as getBoardByIdRepo, getAllBoardsOrganizationId as getAllBoardsOrganizationIdRepo } from './board.repository.js';

export const createBoard = async (data) => {
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