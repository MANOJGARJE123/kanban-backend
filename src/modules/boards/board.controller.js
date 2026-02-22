import * as boardService from './board.service.js'; 

export const createBoard = async (req, res, next) => {
    try {   
        const data = await boardService.createBoard(req.body);
        res.status(201).json({ success: true, data });
    }catch (error){
        next(error);
    }
}

export const getBoardsByOrganizationId = async (req, res, next) => {
    try {
        const data = await boardService.getAllBoardsOrganizationId(req.params.organizationId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const getBoardById = async (req, res, next) => {
    try {
        const data = await boardService.getBoardById(req.params.id);
        res.status(200).json({ success: true, data });
    }catch (error) {
        next(error);
    }
}

export const deleteBoard = async (req, res, next) => {
    try {
        const data = await boardService.deleteBoard(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}