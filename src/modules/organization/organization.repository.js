import pool from '../../config/db.js';
import logger from '../../utils/logger.js';

export const createOrganization = async (userId,data) => {
    const result = await pool.query(
        'insert into organizations (name) values ($1) RETURNING id, name',
        [data.name]
    );

    const organization = result.rows[0];
    await pool.query(
        'INSERT into user_organizations (user_id, organization_id) values ($1, $2)',
        [userId, organization.id]
    );

    return organization;  
}

export const getOrganizationById = async (id) => {
    const result = await pool.query(
        'SELECT id, name from organizations WHERE id = $1',
        [id]
    )
    if (result.rows.length === 0) {
        logger.warn(`Organization not found with id: ${id}`);
        throw new Error('Organization not found');
    }
    logger.debug(`Fetched organization ${id}`);
    return result.rows[0];
} 

export const deleteOrganization = async (id) => {
    const result = await pool.query(
        'DELETE from organizations where id = $1 RETURNING id',
        [id]
    );
    return result.rows[0];
}

export const addUserToOrganization = async (userId, organizationId) => {
    try {
        const detailsResult = await pool.query(
            'SELECT u.email as user_email, o.name as organization_name FROM users u CROSS JOIN organizations o WHERE u.id = $1 AND o.id = $2',
            [userId, organizationId]
        );
        const details = detailsResult.rows[0] || {};
        const result = await pool.query(
            'INSERT into user_organizations (user_id, organization_id) values ($1, $2) returning user_id, organization_id, created_at',
            [userId, organizationId]
        );
        logger.info(`User ${details.user_email || userId} added to organization ${details.organization_name || organizationId}`);
        return result.rows[0];
    } catch (error) {
        logger.error(`Failed to add user ${userId} to organization ${organizationId}`, error);
        throw error;
    }
}

export const deleteUserFromOrganization = async (userId, organizationId) => {
    const detailsResult = await pool.query(
        'SELECT u.email as user_email, o.name as organization_name FROM users u CROSS JOIN organizations o WHERE u.id = $1 AND o.id = $2',
        [userId, organizationId]
    );
    
    if (detailsResult.rows.length === 0) {
        logger.warn(`User ${userId} or organization ${organizationId} not found`);
        throw new Error('User or organization not found');
    }
    
    const details = detailsResult.rows[0];
    
    const result = await pool.query(
        'DELETE from user_organizations where user_id = $1 and organization_id = $2 RETURNING user_id, organization_id',
        [userId, organizationId]
    );
    
    if (result.rows.length === 0) {
        logger.warn(`User ${userId} not found in organization ${organizationId}`);
        throw new Error('User not found in organization');
    }
    
    logger.info(`User ${details.user_email} removed from organization ${details.organization_name}`);
    
    return {
        userId: result.rows[0].user_id,
        organizationId: result.rows[0].organization_id,
        userEmail: details.user_email,
        organizationName: details.organization_name
    };
}   

export const getUserOrganizations = async (userId) => {
    logger.info(`Fetching organizations for user ${userId}`);
    const result = await pool.query(
        'select o.id, o.name from organizations o join user_organizations uo on o.id = uo.organization_id where uo.user_id = $1',
        [userId]
    )
    logger.debug(`Fetched organizations for user ${userId}: ${result.rows.length} organizations found`);
    return result.rows;
}

export const getOrganizationUsers = async (organizationId) => {
    const result = await pool.query(
        'SELECT u.id, u.email from users u join user_organizations uo ON u.id = uo.user_id WHERE uo.organization_id = $1',
        [organizationId]
    );
    return result.rows;
    
}