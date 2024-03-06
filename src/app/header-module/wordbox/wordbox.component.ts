import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SaveService } from 'src/app/services/save.service';
import { WordsService } from 'src/app/services/words.service';
import { MessageService } from 'primeng/api';
import {
  ChallengesService,
  language,
} from 'src/app/services/challenges.service';
import { GameUtils } from 'src/app/utils/utils';

@Component({
  selector: 'app-wordbox',
  templateUrl: './wordbox.component.html',
  styleUrls: ['./wordbox.component.scss'],
})
export class WordboxComponent implements OnInit, OnDestroy {
  lettersPerSecond = 0;
  comboCounter = 0;
  startTime = Date.now();
  letters = 0;
  inputValue = '';
  LPSVisibility = false;
  ComboCounterVisibility = false;
  critical = false;
  language: language = 'English';
  private currentWord: string = '';
  private intervalSubscription: Subscription = new Subscription();

  constructor(
    private wordService: WordsService,
    private layoutService: LayoutService,
    private gameService: GameService,
    private saveService: SaveService,
    private messageService: MessageService,
    private challengeService: ChallengesService
  ) {
    this.wordService
      .getCurrentWord()
      .subscribe((value) => (this.currentWord = value));

    this.gameService
      .getGame()
      .subscribe((game) => (this.comboCounter = game.wordCounterPerfection));

    this.challengeService
      .getLanguage()
      .subscribe((language) => (this.language = language));
  }

  gameUtils = new GameUtils(this.gameService);

  ngOnInit() {
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.updateLettersPerSecond();
    });

    this.layoutService.getLettersPerSecondVisibility().subscribe((visible) => {
      this.LPSVisibility = visible;
    });

    this.layoutService.getComboCounterVisibility().subscribe((visible) => {
      this.ComboCounterVisibility = visible;
    });
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

  checkWord() {
    console.log(this.language);
    if (this.language === 'Japanese') {
      const japaneseMap = this.gameUtils.getJapaneseMap();
      const regex = new RegExp(Object.keys(japaneseMap).join('|'), 'g');
      this.inputValue = this.inputValue.replace(regex, (x) => japaneseMap[x]);
    }
    if (this.language === 'Russian') {
      const russianMap = this.gameUtils.getRussianCyrillicMap();
      const regex = new RegExp(Object.keys(russianMap).join('|'), 'g');
      this.inputValue = this.inputValue.replace(regex, (x) => russianMap[x]);
    }
    if (this.language === 'Amharic') {
      const amharicMap = this.gameUtils.getAmharicMap();
      const regex = new RegExp(Object.keys(amharicMap).join('|'), 'g');
      this.inputValue = this.inputValue.replace(regex, (x) => amharicMap[x]);
    }
    this.gameService.updateLetterCounter();
    this.gameService.updateLetterCounterPerfection();
    if (this.wordService.checkWordMatch(this.inputValue)) {
      if (
        this.gameService.game.value.letterCounterPerfection ===
        this.currentWord.length
      ) {
        this.gameService.updateWordCounterPerfection();
      } else {
        this.gameService.setWordCounterPerfection(0);
      }
      this.gameService.setLetterCounterPerfection(0);
      this.wordService.wordShifted.next();
      this.wordService.guessedWord(this.inputValue);
      this.inputValue = '';
      if (Math.floor(Math.random() * 10) === 1)
        this.wordService.setCritical(true);
      else this.wordService.setCritical(false);
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

  isComboCounterVisible() {
    return this.ComboCounterVisibility;
  }

  saveGame() {
    this.saveService.saveGame();
    this.messageService.add({
      severity: 'info',
      summary: 'Saved!',
      life: 1000,
      contentStyleClass: 'my-toast',
    });
  }

  loadGame(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const encodedString = event.target?.result as string;
      if (!encodedString) return;
      const decodedString = await this.saveService.decode(encodedString);
      this.saveService.loadGame(decodedString);
    };
    fileReader.readAsText(file);
    this.messageService.add({
      severity: 'info',
      summary: 'Loaded!',
      life: 1000,
      contentStyleClass: 'my-toast',
    });
  }

  logGame() {
    console.log('Current Game: ', this.gameService.game.value);
    console.log('Challenge Game: ', this.gameService.challengeGame.value);
    console.log('Active Game: ', this.gameService.activeGame.value);
    this.messageService.add({
      severity: 'info',
      summary: 'Logged!',
      life: 1000,
      contentStyleClass: 'my-toast',
    });
  }
}
