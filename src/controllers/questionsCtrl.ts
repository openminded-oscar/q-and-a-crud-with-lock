import { Request, Response } from 'express';
import { QuestionsService } from '../services/questionsService';

const QuestionsCtrl = {
    list: async (req: Request, res: Response) => {
        QuestionsService.getQuestions()
            .then(questions => {
                res.status(200).send(questions);
            }).catch(e => {
            console.error('failed to fetch questions', e);
            res.status(500).json({ error: e.message });
        });
    },

    getOne: async (req: Request, res: Response) => {
        QuestionsService.getQuestion(req.body)
            .then(question => {
                if (question) {
                    res.status(200).send(question);
                } else {
                    res.status(404).json({ error: 'Question not found' });
                }
            }).catch(e => {
            console.error('failed to get question', e);
            res.status(500).json({ error: e.message });
        });
    },

    post: async (req: Request, res: Response) => {
        QuestionsService.createQuestion(req.body)
            .then(question => {
                res.status(201).send(question);
            }).catch(e => {
            console.error('failed to create question', e);
            res.status(500).json({ error: e.message });
        });
    },

    put: async (req: Request, res: Response) => {
        QuestionsService.updateQuestion(req.params.id, req.body)
            .then(question => {
                if (question) {
                    res.status(200).send(question);
                } else {
                    res.status(404).json({ error: 'Question not found' });
                }
            }).catch(e => {
            console.error('failed to update question', e);
            res.status(500).json({ error: e.message });
        });
    },

    delete: async (req: Request, res: Response) => {
        QuestionsService.deleteQuestion(req.params.id)
            .then(question => {
                if (question) {
                    res.status(200).send(question);
                } else {
                    res.status(404).json({ error: 'Question not found' });
                }
            }).catch(e => {
            console.error('failed to delete question', e);
            res.status(500).json({ error: e.message });
        });
    }
};

export default QuestionsCtrl;
