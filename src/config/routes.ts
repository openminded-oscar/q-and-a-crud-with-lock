import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';
import rateLimit from "express-rate-limit";

// requests limiter to prevent spamming from ip
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
    standardHeaders: true,
    legacyHeaders: false,
});

const router = express.Router();

router.get('/questions', [limiter], QuestionsCtrl.list);
router.get('/questions/:id', [limiter], QuestionsCtrl.getOne);
router.post('/questions', [limiter], QuestionsCtrl.post);
router.put('/questions/:id', [limiter], QuestionsCtrl.put);
router.delete('/questions/:id', [limiter], QuestionsCtrl.delete);

export default router;
