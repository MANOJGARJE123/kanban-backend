import { createOrganization as createOrganizationRepo, getOrganizationById as getOrganizationByIdRepo } from './organization.repository.js';

export const createOrganization = async (data) => {
    const result = await createOrganizationRepo(data);
    return result;
}

export const getOrganizationById = async (id) => {
    const result = await getOrganizationByIdRepo(id);
    return result;
}   