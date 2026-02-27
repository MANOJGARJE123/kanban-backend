import { 
    createOrganization as createOrganizationService, 
    getOrganizationById as getOrganizationByIdService, 
    deleteOrganization as deleteOrganizationService,
    addUserToOrganization as addUserToOrganizationService,
    getUserOrganizations as getUserOrganizationsService,
    getOrganizationUsers as getOrganizationUsersService,
    deleteUserFromOrganization as deleteUserFromOrganizationService
} from './organization.service.js';

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

export const addUserToOrganization = async (req, res, next) => {
    try {
        const data = await addUserToOrganizationService(req.body.userId, req.params.id);
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const deleteUserFromOrganization = async (req, res, next) => {
    try {
        console.log('Delete user from organization request', {
            userId: req.body.userId,
            organizationId: req.params.id
        });

        const data = await deleteUserFromOrganizationService(
            req.body.userId,
            req.params.id
        );

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        next(error);
    }
};
export const getUserOrganizations = async (req, res, next) => {
    try {
        const data = await getUserOrganizationsService(req.params.userId);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const getOrganizationUsers = async (req, res, next) => {
    try {
        const data = await getOrganizationUsersService(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}