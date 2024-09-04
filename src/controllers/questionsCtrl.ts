import {Request, Response} from 'express';
import {QuestionsService} from '../services/questionsService';
import { Question } from "../model/question";

const QuestionsCtrl = {
  post: async (req: Request, res: Response) => {
    try {
      const newQuestion = new Question(req.body);
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  put: async (req: Request, res: Response) => {
    try {
      const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const question = await Question.findByIdAndDelete(req.params.id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  list: async (req: Request, res: Response) => {
    // QuestionsService.getQuestions()
    //   .then(questions => {
    //     res.status(200).send(questions);
    //   }).catch(e => {
    //     console.error('failed to fetch questions', e);
    //     res.status(500).send();
    // });
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default QuestionsCtrl;
