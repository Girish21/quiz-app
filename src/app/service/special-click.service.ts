import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SpecialClickService {

  clickCount = 0;
  doneChoosing: Subject<number> = new Subject<number>();

  constructor() {}

  updateCount() {
    if (this.canClick()) {
      this.clickCount += 1;
      // console.log(this.clickCount);
    }
    if (this.clickCount === 4) {
      this.doneChoosing.next(4);
    }
  }

  private canClick() {
    return this.clickCount < 5;
  }

  resetCount() {
    this.clickCount = 0;
  }
}
