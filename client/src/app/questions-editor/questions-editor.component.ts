import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IQuestion } from '../question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CountdownComponent } from '../count-down/count-down.component';

@Component({
  selector: 'app-questions-editor',
  templateUrl: './questions-editor.component.html',
  styleUrls: ['./questions-editor.component.scss']
})
export class QuestionsEditorComponent implements OnInit, OnDestroy {
  public EDIT_MAX_DURATION = 59;
  private destroy$ = new Subject<boolean>();
  // tslint:disable-next-line:variable-name

  public isNew = true;
  public questionForm: FormGroup;
  @ViewChild(CountdownComponent, { static: false })
  public countdownComponent: CountdownComponent;
  @Output()
  public save = new EventEmitter<IQuestion & { isNew: boolean }>();
  public question: IQuestion;

  get isFormEmpty(): boolean {
    return Object.values(this.questionForm.value).every(value => !value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private questionsService: QuestionsService,
  ) {
  }

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      answer: ['', Validators.required],
    });

    this.questionsService.activeQuestion
      .subscribe(question => {
        this.question = question;
        this.isNew = !question;
        this.questionForm.reset(this.question);
      });
  }

  public saveQuestion(): void {
    const question = {
      ...(this.questionForm.getRawValue()),
      _id: this.question?._id,
      isNew: this.isNew,
    };
    if (this.isNew) {
      this.questionsService.addQuestion(question).subscribe();
    } else {
      this.questionsService.editQuestion(question._id, question).subscribe();
    }
  }

  public timePassed(): void {
    this.cancelChanges();
  }

  public cancelChanges(): void {
    const questionId = this.question?._id;
    const lockId = this.question?.lockId;
    this.questionsService.activeQuestion.next(null);
    this.questionForm.reset();
    this.isNew = true;

    if (questionId && lockId) {
      this.questionsService.releaseQuestionLock(questionId, lockId)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }


  ngOnDestroy(): void {
    const questionId = this.question?._id;
    const lockId = this.question?.lockId;
    if (questionId && lockId) {
      this.questionsService.releaseQuestionLock(questionId, lockId)
        .subscribe();
    }
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
