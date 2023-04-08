import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
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
    var pointsLetters = word.length;
    var lettersValue = this.activeService.GetPointsLetters(word);

    if (this.gameUtils.IsPurchasedUpgrade(7)) {
      pointsLetters += lettersValue;
      if (lettersValue > this.activeService.GetPointsLetters(this.gameService.game.value.bestWord))
      {
        this.gameService.setBestWord(word);
      }
    }

    var wordPoints = this.activeService.CalculatePoints(pointsLetters);
    this.gameService.updatePoints(wordPoints);
    this.gameService.updateAllTimePoints(wordPoints);
    this.gameService.updateWordsAmount();
    // if(this.gameService.game.isInChallenge) {this.challengeService.checkProgress()}
    if(word === "Jack-go-to-bed-at-noon" && this.gameUtils.IsUnlockedAchievement("Best Word")) {
      this.achievementService.unlockAchievement("Best Word");
      //this.achievementService.showAchievement("Best Word");
    }
    if(word.length == 10 && this.gameUtils.IsUnlockedAchievement("10-letter Word")) {
      this.achievementService.unlockAchievement("10-letter Word");
      //this.achievementService.showAchievement("10-letter Word");
    }
  }
}




