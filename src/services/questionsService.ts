import { IQuestion, Question } from "../model/question";


export class QuestionsService {

  static async getQuestions() {
    const questions = await Question.find().sort({ updatedAt: -1 });
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
