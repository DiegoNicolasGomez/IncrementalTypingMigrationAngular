import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
import { eIdUpgrade } from '../classes/upgrade';
import { GameUtils } from '../utils/utils';
import { AchievementsService } from './achievements.service';
import { ActiveService } from './active.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
   private wordListUrl: string = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
   wordList: string[] = [];
   private currentWord = new BehaviorSubject<string>('');
   wordShifted = new Subject<void>();
   wordBonus: string = '';
   
   constructor(private gameService: GameService, private http: HttpClient, private activeService: ActiveService, private achievementService: AchievementsService) {}

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
  
    if (this.gameUtils.HasCard(12) || this.gameUtils.IsInChallenge(1))
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

  guessedWord(word: string) {
    this.wordBonus = '';
    var pointsLetters = word.length;
    this.wordBonus += '[WordLength] '
    if (this.gameUtils.IsPurchasedUpgrade("ScrabbleModule")) {
      var lettersValue = this.activeService.GetPointsLetters(word);
      pointsLetters += lettersValue;
      this.wordBonus += ` + [LettersValue] (Upgrade 8)`;
      if (lettersValue > this.activeService.GetPointsLetters(this.gameService.game.value.bestWord))
      {
        this.gameService.setBestWord(word);
      }
    }

    if(this.gameUtils.IsPurchasedUpgrade("SameLetterBonus")) {
      pointsLetters += Math.pow(1.25, this.activeService.getRepeatedLetters(word));
      this.wordBonus += ` + [DifferentRepeatedLetters] (Upgrade 14)`;
    }

    if(this.gameUtils.IsPurchasedUpgrade("DifferentLetterBonus")) {
      pointsLetters += Math.pow(1.1, this.activeService.getDifferentLetters(word));
      this.wordBonus += ` + [DifferentLetters] (Upgrade 17)`;
    }

    var result = this.activeService.CalculatePoints(pointsLetters);
    this.wordBonus += result[1];
    this.gameService.updatePoints(result[0]);
    this.gameService.updateAllTimePoints(result[0]);
    this.gameService.updateWordsAmount();

    //CHECK
    if(word === "Jack-go-to-bed-at-noon" && this.gameUtils.IsUnlockedAchievement("Best Word")) {
      this.achievementService.unlockAchievement("Best Word");
      this.achievementService.showAchievement("Best Word");
    }
    if(word.length == 10 && this.gameUtils.IsUnlockedAchievement("10-letter Word")) {
      this.achievementService.unlockAchievement("10-letter Word");
      this.achievementService.showAchievement("10-letter Word");
    }
  }

  getWordBonus(): string {
    return this.wordBonus;
  }
}




