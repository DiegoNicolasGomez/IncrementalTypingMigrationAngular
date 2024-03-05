import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
import { eIdUpgrade } from '../classes/upgrade';
import { GameUtils } from '../utils/utils';
import { AchievementsService } from './achievements.service';
import { ActiveService } from './active.service';
import { MasteryService } from './mastery.service';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  wordList: string[] = [];
  private currentWord = new BehaviorSubject<string>('');
  wordShifted = new Subject<void>();
  wordBonus: string = '';
  private critical = new BehaviorSubject<boolean>(false);

  constructor(
    private gameService: GameService,
    private http: HttpClient,
    private activeService: ActiveService,
    private achievementService: AchievementsService,
    private masteryService: MasteryService
  ) {}

  gameUtils = new GameUtils(this.gameService);

  // loadingElement = document.createElement("div");
  // loadingElement.innerText = "Loading...";
  // loadingElement.classList.add("loadingPage");
  // document.body.appendChild(loadingElement);

  generateWord() {
    var filteredWordList = this.wordList.filter(
      (x) => x.length <= this.gameService.game.value.maxLength
    );
    var generatedWord =
      filteredWordList[Math.floor(Math.random() * filteredWordList.length)];

    if (this.gameUtils.HasCard(12) || this.gameUtils.IsInChallenge('Accuracy'))
      generatedWord = generatedWord.toLowerCase();

    return generatedWord;
  }

  getCurrentWord(): Observable<string> {
    return this.currentWord.asObservable();
  }

  setCurrentWord(word: string) {
    this.currentWord.next(word);
  }

  checkWordMatch(input: string) {
    return this.currentWord.value === input;
  }

  setCritical(value: boolean) {
    this.critical.next(value);
  }

  getCritical() {
    return this.critical.asObservable();
  }

  guessedWord(word: string) {
    this.wordBonus = '';
    var pointsLetters = word.length;
    this.wordBonus += '[WordLength] ';
    if (this.gameUtils.IsPurchasedUpgrade('ScrabbleModule')) {
      var lettersValue = this.activeService.GetPointsLetters(word);
      pointsLetters += lettersValue;
      this.wordBonus += ` + [LettersValue] (Upgrade 8)`;
      if (
        lettersValue >
        this.activeService.GetPointsLetters(
          this.gameService.game.value.bestWord
        )
      ) {
        this.gameService.setBestWord(word);
      }
    }

    if (this.gameUtils.IsPurchasedUpgrade('SameLetterBonus')) {
      pointsLetters += Math.pow(
        1.25,
        this.activeService.getRepeatedLetters(word)
      );
      this.wordBonus += ` + [DifferentRepeatedLetters] (Upgrade 14)`;
    }

    if (this.gameUtils.IsPurchasedUpgrade('DifferentLetterBonus')) {
      pointsLetters += Math.pow(
        1.1,
        this.activeService.getDifferentLetters(word)
      );
      this.wordBonus += ` + [DifferentLetters] (Upgrade 17)`;
    }

    var result = this.activeService.CalculatePoints(pointsLetters);
    this.wordBonus += result[1];

    if (this.gameUtils.IsPurchasedUpgrade('UnlockMastery')) {
      const mastery = this.gameService.game.value.masteryLevels.find((x) =>
        x.letters.includes(word[0].toLowerCase())
      )!;
      result[0] *= mastery.value;
    }

    if (this.critical.value === true) result[0] *= 5;

    this.gameService.updatePoints(result[0]);
    this.gameService.updateAllTimePoints(result[0]);
    this.gameService.updateWordsAmount();

    if (
      word === 'Jack-go-to-bed-at-noon' &&
      !this.gameUtils.IsUnlockedAchievement('Best Word')
    ) {
      this.achievementService.completeAchievement('Best Word');
      this.achievementService.showAchievement('Best Word');
    }

    if (
      word.length == 10 &&
      !this.gameUtils.IsUnlockedAchievement('10-letter Word')
    ) {
      this.achievementService.completeAchievement('10-letter Word');
    }

    const consConsRegex = /[bcdfghjklmnpqrstvwxyz]{5}/i;

    if (
      consConsRegex.test(word) &&
      !this.gameUtils.IsUnlockedAchievement('Consonant Collector')
    ) {
      this.achievementService.completeAchievement('Consonant Collector');
    }

    const consVowelRegex = /[aeiou]{4}/i;

    if (
      consVowelRegex.test(word) &&
      !this.gameUtils.IsUnlockedAchievement('Vowel Voyager')
    ) {
      this.achievementService.completeAchievement('Vowel Voyager');
    }

    if (
      word === word.split('').reverse().join('') &&
      !this.gameUtils.IsUnlockedAchievement('Palindrome Searcher')
    ) {
      this.achievementService.completeAchievement('Palindrome Searcher');
    }

    if (this.gameUtils.IsPurchasedUpgrade('UnlockMastery')) {
      const initialLetter = word[0];
      const mastery = this.gameService.game.value.masteryLevels.find((x) =>
        x.letters.includes(initialLetter.toLowerCase())
      )!;
      this.masteryService.updateMasteryValue(mastery.tier);
    }
  }

  getWordBonus(): string {
    return this.wordBonus;
  }
}
