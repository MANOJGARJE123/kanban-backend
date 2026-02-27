import express from 'express';
import * as organizationController from './organization.controller.js';
import isAuth from '../../middlewares/isAuth.js';

const router = express.Router();

router.get('/user/:userId/organizations', isAuth, organizationController.getUserOrganizations);

router.post('/', isAuth, organizationController.createOrganization);
router.get('/:id', isAuth, organizationController.getOrganizationById);
router.delete('/:id', isAuth, organizationController.deleteOrganization);

router.post('/:id/users', isAuth, organizationController.addUserToOrganization);
router.get('/:id/users', isAuth, organizationController.getOrganizationUsers);
router.delete('/:id/users', isAuth, organizationController.deleteUserFromOrganization);

export default router;
