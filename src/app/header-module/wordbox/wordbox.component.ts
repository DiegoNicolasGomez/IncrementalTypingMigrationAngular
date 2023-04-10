import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SaveService } from 'src/app/services/save.service';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-wordbox',
  templateUrl: './wordbox.component.html',
  styleUrls: ['./wordbox.component.scss'],
})
export class WordboxComponent implements OnInit, OnDestroy {
  lettersPerSecond = 0;
  startTime = Date.now();
  letters = 0;
  inputValue = '';
  LPSVisibility = false;
  private intervalSubscription: Subscription = new Subscription();

  constructor(
    private wordService: WordsService,
    private layoutService: LayoutService,
    private gameService: GameService,
    private saveService: SaveService
  ) {}

  ngOnInit() {
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.updateLettersPerSecond();
    });

    this.layoutService.getLettersPerSecondVisibility().subscribe((visible) => {
      this.LPSVisibility = visible;
    });
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

  saveGame() {
    this.saveService.saveGame();
  }

  loadGame(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el.files?.[0];
    if(!file) return;
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const encodedString = event.target?.result as string;
      if(!encodedString) return;
      const decodedString = await this.saveService.decode(encodedString);
      console.log(decodedString);
      this.saveService.loadGame(decodedString);
    }
    fileReader.readAsText(file);
  }

  logGame() {
    console.log(this.gameService.game.value);
  }
}
