import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Quiz} from '../model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class QuizService {

  quiz: Quiz = new Quiz(null);
  quizLoaded: Subject<Quiz> = new Subject<Quiz>();
  quizUpdated: Subject<Quiz> = new Subject<Quiz>();

  constructor(private http: Http) {
  }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  loadQuiz() {
    this.get('data/inq.json').subscribe(res => {
      this.quiz = new Quiz(res);
      this.quizLoaded.next(this.quiz);
    });
  }

  updateSpecialQuestion(index: number) {
    this.quiz.questions[index].doublePoints = true;
    this.quiz.questions[index].isClicked = true;
    this.quizUpdated.next(this.quiz);
  }

}
