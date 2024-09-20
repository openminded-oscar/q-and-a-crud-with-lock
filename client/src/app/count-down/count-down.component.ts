import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { QuestionsService } from '../questions.service';


@Component({
  selector: 'app-countdown',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  constructor(private questionService: QuestionsService) {
  }

  // tslint:disable-next-line:variable-name
  private _initialTime;
  get initialTime(): number {
    return this._initialTime;
  }

  @Input()
  set initialTime(value: number) {
    this._initialTime = value;
    this.startCountdown();
  }

  @Input()
  public title = 'Time left:';

  public timeLeft: number;

  @Output()
  public timePassed = new EventEmitter<void>();

  private intervalFunc: any;

  public startCountdown(): void {
    if (this.intervalFunc) {
      clearInterval(this.intervalFunc);
    }
    this.timeLeft = this.initialTime;
    this.intervalFunc = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timePassed.emit();
        clearInterval(this.intervalFunc);
      }
    }, 1000);
  }

  public hideCountdown(): void {
    this.timeLeft = 0;
  }

  ngOnDestroy(): void {
    if (this.intervalFunc) {
      clearInterval(this.intervalFunc);
    }
  }

  ngOnInit(): void {
    this.questionService.activeQuestion.subscribe(q => {
      if (q) {
        this.startCountdown();
      } else {
        this.hideCountdown();
      }
    });
  }
}
