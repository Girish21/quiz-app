import {Option} from './option';

export class Question {
  id: number;
  name: string;
  questionTypeId: number;
  doublePoints: boolean;
  isClicked: boolean;
  hasPicture: boolean;
  pictureUrl: string;
  options: Option[];
  answered: boolean;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.name = data.name;
    this.questionTypeId = data.questionTypeId;
    this.doublePoints = data.doublePoints;
    this.isClicked = data.isClicked;
    this.hasPicture = data.hasPicture;
    this.pictureUrl = data.pictureUrl;
    this.options = [];
    data.options.forEach(o => {
      this.options.push(new Option(o));
    });
  }
}
