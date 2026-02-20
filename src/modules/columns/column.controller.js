import * as columnServices from './column.service.js';

export const createColumn = async (req, res, next) => {
    try {
        const data = await columnServices.createColumn(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const getColumnById = async (req, res, next) => {
    try {
        const data = await columnServices.getColumnById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const reorderColumns = async (req, res, next) => {
    try {
        const data = await columnServices.reorderColumns(req.body);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const deleteColumn = async (req, res, next) => {
    try {
        const columnId = req.params.id || req.body.id;
        const data = await columnServices.deleteColumn(columnId);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}