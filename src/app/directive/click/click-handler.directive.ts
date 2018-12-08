import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {Question} from '../../model';
import {SpecialClickService} from '../../service/special-click.service';
import {QuizService} from '../../service/quiz.service';

@Directive({
  selector: '[appClickHandler]'
})
export class ClickHandlerDirective {

  @Input() question: Question;
  @Input() index: number;

  constructor(private el: ElementRef, private clickService: SpecialClickService, private quizService: QuizService) {
  }

  @HostListener('click') clicked() {
    if (!this.question.isClicked) {
      this.el.nativeElement.classList.add('card-clicked');
      this.clickService.updateCount();
      this.quizService.updateSpecialQuestion(this.index);
    }
  }

}
