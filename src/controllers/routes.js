import { Router } from 'express';

import { paddlesPage, top10Page, detailPage } from './paddles/paddles.js';
import { quizPage } from './forms/quiz.js'

const router = Router();

// Paddles routes
router.get('/top10', top10Page);
router.get('/', paddlesPage);
router.get('/:id', detailPage);

// Quiz route
router.get('/quiz', quizPage);
router.post('/quiz', quizPage);

export default router;