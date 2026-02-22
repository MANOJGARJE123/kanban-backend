import { createOrganization as createOrganizationService, getOrganizationById as getOrganizationByIdService, deleteOrganization as deleteOrganizationService } from './organization.service.js';

export const createOrganization = async (req, res, next) => {
    try {
        const data = await createOrganizationService(req.user.id, req.body);
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const getOrganizationById = async (req, res, next) => {
    try {
        const data = await getOrganizationByIdService(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const deleteOrganization = async (req, res, next) => {
    try {
        const data = await deleteOrganizationService(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}   