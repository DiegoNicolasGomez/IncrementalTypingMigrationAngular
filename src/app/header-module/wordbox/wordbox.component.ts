import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-wordbox',
  templateUrl: './wordbox.component.html',
  styleUrls: ['./wordbox.component.scss'],
})
export class WordboxComponent implements OnInit, OnDestroy{
  lettersPerSecond = 0;
  startTime = Date.now();
  letters = 0;
  inputValue = '';
  LPSVisibility = false;
  private intervalSubscription: Subscription = new Subscription; 

  constructor(private wordService: WordsService, private layoutService: LayoutService) {}

  ngOnInit() {
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.updateLettersPerSecond();
    })

    this.layoutService.getLettersPerSecondVisibility().subscribe((visible) => {
      this.LPSVisibility = visible;
    })
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

  checkWord() {
    if (this.wordService.checkWordMatch(this.inputValue)) {
      this.wordService.wordShifted.next();
      this.wordService.guessedWord(this.inputValue);
      this.inputValue = '';
    }
  }

  updateLettersPerSecond() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - this.startTime) / 1000;
    const newLetters = this.inputValue.length;
    const deltaLetters = newLetters - this.letters;
    this.letters = newLetters;
    this.lettersPerSecond = deltaLetters >= 0 ? deltaLetters / elapsedTime : 0;
    this.startTime = currentTime;
  }

  isCounterVisible() {
    return this.LPSVisibility;
  }
}
