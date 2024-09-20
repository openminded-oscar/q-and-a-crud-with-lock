import { Component, OnDestroy, OnInit } from '@angular/core';
import { IQuestion } from './question.interface';
import { QuestionsService } from './questions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'qna';
  private destroy$ = new Subject<boolean>();
  public questionsList: IQuestion[];

  constructor(public questionService: QuestionsService) {
  }

  ngOnInit(): void {
    this.resetData();
  }

  private resetData(): void {
    this.questionService.getAllQuestions()
      .subscribe();

    this.questionService.questionsList
      .pipe(takeUntil(this.destroy$))
      .subscribe(questions => {
        this.questionsList = questions;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
