import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizService} from '../../../service/quiz.service';
import {Option, Question, Quiz, QuizConfig} from '../../../model';
import {Subscription} from 'rxjs/Subscription';
import {SpecialClickService} from '../../../service/special-click.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  quizSubscription: Subscription;
  quizUpdatedSubscription: Subscription;
  clickSubscription: Subscription;

  quiz: Quiz = new Quiz(null);
  mode = 'wild-card';
  count = 0;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  constructor(private quizService: QuizService, private clickService: SpecialClickService) {
  }

  ngOnInit() {
    this.quizService.loadQuiz();
    this.quizSubscription = this.quizService.quizLoaded.subscribe(
      data => {
        this.quiz = data;
        this.pager.count = this.quiz.questions.length;
      }
    );
    this.clickSubscription = this.clickService.doneChoosing.subscribe(
      data => {
        if (data === 4) {
          this.mode = 'quiz';
        }
      }
    );
    this.quizUpdatedSubscription = this.quizService.quizUpdated.subscribe(
      data => {
        this.quiz = data;
        // console.log(this.quiz);
      }
    );
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) {
          x.selected = false;
        }
      });
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }

  onSubmit() {
    this.quiz.questions.forEach(x => {
      x.options.forEach(y => {
        if (y.isAnswer && y.selected === y.isAnswer) {
          // console.log(y);
          this.count++;
          if (x.doublePoints) {
            this.count++;
          }
        }
      });
    });
    this.mode = 'result';
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
    this.clickSubscription.unsubscribe();
    this.clickService.resetCount();
  }

}
