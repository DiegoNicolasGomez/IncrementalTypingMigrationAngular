import { Component} from '@angular/core';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-wordbox',
  templateUrl: './wordbox.component.html',
  styleUrls: ['./wordbox.component.scss']
})
export class WordboxComponent {

  inputValue = '';

  constructor(private wordService: WordsService) {}

  checkWord() {
    if(this.wordService.checkWordMatch(this.inputValue)) {
      this.wordService.wordShifted.next();
    }
  }
}
