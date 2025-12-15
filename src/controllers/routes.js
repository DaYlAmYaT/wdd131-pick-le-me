import { Router } from 'express';

import { paddlesPage, top10Page, detailPage } from './paddles/paddles.js';
import { quizPage } from './forms/quiz.js'
import { loginPage, processLogin, processLogout, dashboardPage, loginValidation } from './forms/login.js'
import { registerPage, processRegister, showEditAccountForm, processEditAccount, processDeleteAccount } from './forms/register.js';
import { requireLogin, requireRole } from '../middlewares/auth.js';
import { usersPage, processGivePermission, processRevokePermission } from './users/users.js';

const router = Router();

// Login route
router.get('/login', loginPage)
router.post('/login', loginValidation, processLogin)
router.get('/logout', processLogout)
router.get('/dashboard', requireLogin, dashboardPage)

// Register route
router.get('/register', registerPage)
router.post('/register', processRegister)

// Users routes
router.get('/users', requireLogin, requireRole(['admin', 'co-admin']), usersPage)
router.get('/users/:id/edit', requireLogin, showEditAccountForm)
router.post('/users/:id/update', requireLogin, processEditAccount)
router.post('/users/:id/delete', requireLogin, requireRole(['admin']), processDeleteAccount)
router.post('/users/:id/givePermission', requireLogin, requireRole(['admin']), processGivePermission)
router.post('/users/:id/revokePermission', requireLogin, requireRole(['admin']), processRevokePermission)

// Quiz route
// router.get('/quiz', quizPage);
// router.post('/quiz', quizPage);

// Paddles routes
router.get('/top10', top10Page);
router.get('/paddles', paddlesPage);
router.get('/paddles/:paddleId', detailPage);

export default router;