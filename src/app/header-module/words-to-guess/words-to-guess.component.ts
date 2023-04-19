import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { WordsService } from 'src/app/services/words.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-words-to-guess',
  templateUrl: './words-to-guess.component.html',
  styleUrls: ['./words-to-guess.component.scss'],
})
export class WordsToGuessComponent implements OnInit {
  private wordListUrl: string = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
  wordLeft: string = '';
  wordLeft2: string = '';
  wordToGuess: string = '';
  wordRight: string = '';
  wordRight2: string = '';

  constructor(private wordService: WordsService, private http: HttpClient) {
    this.http.get(this.wordListUrl, { responseType: 'text' } ).subscribe((response) => {
      const wordList = response.split("\n");
      this.wordService.wordList = wordList;
      this.setWords();
    });
  }

  ngOnInit(): void {
    this.wordService.wordShifted.subscribe(() => {
      this.shiftWords();
    });

    this.wordService.getCurrentWord().subscribe((word) => {
      this.wordToGuess = word;
    });
  }

  setWords() {
    this.wordLeft = this.wordService.generateWord();
    this.wordLeft2 = this.wordService.generateWord();
    this.wordService.setCurrentWord(this.wordService.generateWord());
    this.wordRight = this.wordService.generateWord();
    this.wordRight2 = this.wordService.generateWord();
  }

  shiftWords() {
    this.wordLeft = this.wordLeft2;
    this.wordLeft2 = this.wordToGuess;
    this.wordService.setCurrentWord(this.wordRight);
    this.wordRight = this.wordRight2;
    this.wordRight2 = this.wordService.generateWord();
  }

  getWordBonus(): string {
    return this.wordService.getWordBonus();
  }
}
