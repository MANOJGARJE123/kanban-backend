import { createOrganization as createOrganizationService, getOrganizationById as getOrganizationByIdService } from './organization.service.js';

export const createOrganization = async (req, res, next) => {
    try {
        console.log('Request body', req.body);
        console.log('Content-Type', req.headers['content-type']);
        const data = await createOrganizationService(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const getOrganizationById = async (req, res, next) => {
    try {
        const data = await getOrganizationByIdService(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}   