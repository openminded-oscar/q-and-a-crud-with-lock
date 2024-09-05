import { IQuestion, Question } from "../model/question";
import { v4 as uuidv4 } from 'uuid';

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
        // TODO check lockId
        return Question.findByIdAndUpdate(questionId, {
            ...question,
            $unset: {
                lockExpiresAt: true,
                lockId: true
            }
        });
    }

    static async acquireUpdateLockQuestion(questionId: string): Promise<IQuestion> {
        const question = await Question.findById(questionId);
        const now = new Date();
        const lockAlreadyExists = question.lockId && question.lockExpiresAt
            && (now.getTime() < question.lockExpiresAt?.getTime());

        if (lockAlreadyExists) {
            throw new Error('Question already under edit');
        } else {
            const offsetMs = 60_000; // 1 minute
            const now = new Date();
            const lockExpireAt = new Date(now.getTime() + offsetMs).toISOString();
            return Question.findByIdAndUpdate(questionId, {
                lockId: uuidv4(),
                lockExpiresAt: lockExpireAt,
            }, {
                new: true
            });
        }
    }

    static async releaseUpdateLockQuestion(questionId: string, lockId: string): Promise<IQuestion> {
        const question = await Question.findById(questionId);
        const lockAlreadyExists = question?.lockId && question?.lockId === lockId;
        if (lockAlreadyExists) {
            return Question.findByIdAndUpdate(questionId, {
                $unset: {
                    lockExpiresAt: true,
                    lockId: true
                }
            });
        } else {
            return question;
        }
    }

    static async deleteQuestion(questionId: string): Promise<IQuestion> {
        return Question.findByIdAndDelete(questionId);
    }
}
