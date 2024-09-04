import { IQuestion, Question } from "../model/question";

const DEFAULT_QUESTIONS = [{
  questions: 'What?',
  answer: ''
},{
  questions: 'Who?',
  answer: ''
},{
  questions: 'Where',
  answer: ''
}];

// TODO: use any storage to save the questions
export class QuestionsService {

  static async getQuestions() {
    // todo add sort by date
    const questions = await Question.find();
    return Promise.resolve(questions);
  }

  static async getQuestion(questionId: string): Promise<IQuestion> {
    return Question.findByIdAndUpdate(questionId);
  }

  static async createQuestion(question: IQuestion): Promise<IQuestion> {
    return Question.create(question);
  }

  static async updateQuestion(questionId: string, question: IQuestion): Promise<IQuestion> {
    return Question.findByIdAndUpdate(questionId, question);
  }

  static async deleteQuestion(questionId: string): Promise<IQuestion> {
    return Question.findByIdAndDelete(questionId);
  }
}
