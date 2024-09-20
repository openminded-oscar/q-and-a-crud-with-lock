import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IQuestion } from '../question.interface';
import { QuestionsService } from '../questions.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  @Input()
  public questions!: IQuestion[];
  private destroy$ = new Subject<boolean>();
  public activeQuestion: IQuestion;

  constructor(private questionsService: QuestionsService) {
  }

  ngOnInit(): void {
    this.questionsService.activeQuestion.subscribe(question => {
      this.activeQuestion = question;
    });
  }

  public selectToModify(question: IQuestion): void {
    if (this.activeQuestion && question._id !== this.activeQuestion._id) {
      this.questionsService.releaseQuestionLock(this.activeQuestion._id, this.activeQuestion.lockId)
        .subscribe();
    }
    this.questionsService.reserveForEditQuestion(question._id)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          alert('This question is currently already under modifying. Please wait and try again.');
          return of(null);
        })
      )
      .subscribe(questionFromServer => {

        if (questionFromServer) {
          this.questionsService.activeQuestion.next({
            ...question,
            lockId: questionFromServer?.lockId
          });
        }
      });
  }

  public remove(question: IQuestion): void {
    this.questionsService.deleteQuestion(question._id)
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
