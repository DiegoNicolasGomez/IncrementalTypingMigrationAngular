import { Injectable } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { HasCard, IsInChallenge } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
   private wordListUrl: string = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
   private wordList: string[] = [];
   
   constructor(private gameService: GameService) { }

  async ngOnInit() {
    this.wordList = await this.getWordList();
  }
  // loadingElement = document.createElement("div");
  // loadingElement.innerText = "Loading...";
  // loadingElement.classList.add("loadingPage");
  // document.body.appendChild(loadingElement);

  async getWordList() {
  return fetch(this.wordListUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((wordListText) => {
      const wordList = wordListText.split("\n");
      // document.body.removeChild(loadingElement);
      return wordList;
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error);

      // Remove the loading element from the DOM
      // document.body.removeChild(loadingElement);

      // Rethrow the error so it can be handled elsewhere
      throw error;
    });
  }

  generateWord() {
    var filteredWordList = this.wordList.filter(
      (x) => x.length <= this.gameService.game.maxLength
    );
  
    var generatedWord =
      filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
  
    if (HasCard(12) || IsInChallenge(1))
      generatedWord = generatedWord.toLowerCase();
  
    return generatedWord;
  }
}




