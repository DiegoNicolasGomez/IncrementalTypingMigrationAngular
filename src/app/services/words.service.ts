import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
import { GameUtils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
   private wordListUrl: string = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
   wordList: string[] = [];
   private currentWord = new BehaviorSubject<string>('');
   wordShifted = new Subject<void>();
   
   constructor(private gameService: GameService, private http: HttpClient) {
    }

   gameUtils = new GameUtils(this.gameService);

  // loadingElement = document.createElement("div");
  // loadingElement.innerText = "Loading...";
  // loadingElement.classList.add("loadingPage");
  // document.body.appendChild(loadingElement);

  getData(): Observable<any> {
    return this.http.get(this.wordListUrl, { responseType: 'text' } );
  }

  // async getWordList() {
  // return fetch(this.wordListUrl)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
      
  //     return response.text();
  //   })
  //   .then((wordListText) => {
  //     const wordList = wordListText.split("\n");
  //     // document.body.removeChild(loadingElement);
  //     return wordList;
  //   })
  //   .then((x) => {
  //     this.wordList.next(x);
  //     this.currentWord.next(this.generateWord());
  //     console.log(this.wordListUrl);
  //     console.log(this.wordList);
  //   })
  //   .catch((error) => {
  //     // Handle any errors here
  //     console.error(error);

  //     // Remove the loading element from the DOM
  //     // document.body.removeChild(loadingElement);

  //     // Rethrow the error so it can be handled elsewhere
  //     throw error;
  //   });
  // }

  generateWord() {
    var filteredWordList = this.wordList.filter(
      (x) => x.length <= this.gameService.game.maxLength
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
  // checkText(event: Event) {
  //   if (!event.target) return;
  //   const eventTarget = event.target as HTMLInputElement;
  //   var textBoxText = eventTarget.value;
  
  //   const wordToGuess = document.querySelector("#WordToGuess");
  
  //   if (wordToGuess && textBoxText == wordToGuess.textContent) {
  //     const wordBox = document.querySelector("#WordBox") as HTMLInputElement;
  //     if (wordBox) wordBox.value = "";
  //     var pointsLetters = textBoxText.length;
  //     var lettersValue = activeModule.GetPointsLetters(textBoxText);
  //     if (utilModule.IsPurchasedUpgrade(7)) {
  //       pointsLetters += lettersValue;
  //       if (
  //         lettersValue > activeModule.GetPointsLetters(gameObjects.game.bestWord)
  //       )
  //         gameObjects.game.bestWord = textBoxText;
  //     }
  //     var wordPoints = activeModule.CalculatePoints(pointsLetters);
  //     gameObjects.game.points += wordPoints;
  //     gameObjects.game.allTimePoints += wordPoints;
  //     gameObjects.game.wordsAmount++;
  //     if (gameObjects.game.isInChallenge) challengesModule.CheckProgress();
  //     if (
  //       textBoxText === "Jack-go-to-bed-at-noon" &&
  //       !utilModule.IsUnlockedAchievement("Best Word")
  //     ) {
  //       gameObjects.game.achievements.push(
  //         achievements.find((x) => x.name == "Best Word")!
  //       );
  //       achievementModule.ShowAchievement("Best Word");
  //     }
  //     if (
  //       textBoxText.length == 10 &&
  //       !utilModule.IsUnlockedAchievement("10-letter Word")
  //     ) {
  //       gameObjects.game.achievements.push(
  //         achievements.find((x) => x.name == "10-letter Word")!
  //       );
  //       achievementModule.ShowAchievement("10-letter Word");
  //     }
  //     GuessedWord();
  //   }
  // }

}




