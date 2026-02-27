import * as columnServices from './column.service.js';

export const createColumn = async (req, res, next) => {
    try {
        const data = await columnServices.createColumn(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const getColumnById = async (req, res, next) => {
    try {
        const data = await columnServices.getColumnById(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const reorderColumns = async (req, res, next) => {
    try {
        const { columns } = req.body;
        const data = await columnServices.reorderColumns(columns);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const deleteColumn = async (req, res, next) => {
    try {
        const columnId = req.params.id;
        const data = await columnServices.deleteColumn(columnId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const fetchColumnsOfBoard = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        const data = await columnServices.fetchColumnsOfBoard(boardId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}