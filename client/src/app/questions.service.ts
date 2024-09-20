import { Injectable } from '@angular/core';
import { IQuestion } from './question.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  public activeQuestion = new BehaviorSubject<IQuestion>(null);
  public questionsList = new BehaviorSubject<IQuestion[]>(null);

  constructor(public http: HttpClient) {
  }

  public getAllQuestions(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${environment.apiUrl}/questions`)
      .pipe(tap(q => {
        this.questionsList.next(q);
      }));
  }

  public getQuestion(id: string): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${environment.apiUrl}/questions/${id}`).pipe(tap(questionFromServer => {
      this.activeQuestion.next(questionFromServer);
    }));
  }

  public addQuestion(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${environment.apiUrl}/questions`, question).pipe(tap(questionFromServer => {
      const questions = this.questionsList.getValue() ?? [];
      questions.unshift(questionFromServer);
      this.questionsList.next(questions);
    }));
  }

  public editQuestion(id: string, question: IQuestion): Observable<IQuestion> {
    return this.http.put<IQuestion>(`${environment.apiUrl}/questions/${id}`, question).pipe(tap(questionFromServer => {
      const questions = this.questionsList.getValue() ?? [];
      const index = questions.findIndex(question => questionFromServer._id === question._id);
      if (index >= 0) {
        questions[index] = questionFromServer;
        this.activeQuestion.next(null);
        this.questionsList.next(questions);
      }
    }));
  }

  public deleteQuestion(id: string): Observable<IQuestion> {
    return this.http.delete<IQuestion>(`${environment.apiUrl}/questions/${id}`).pipe(tap(questionFromServer => {
      const questions = this.questionsList.getValue() ?? [];
      const index = questions.findIndex(question => questionFromServer._id === question._id);
      if (index >= 0) {
        questions.splice(index, 1);
        this.questionsList.next(questions);
      }
    }));
  }

  public reserveForEditQuestion(id: string): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${environment.apiUrl}/questions/${id}/acquire`, {});
  }

  public releaseQuestionLock(questionId: string, lockId: string): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${environment.apiUrl}/questions/${questionId}/release`, {
      lockId
    });
  }
}
