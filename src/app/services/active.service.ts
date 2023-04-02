import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  constructor() { }
  
  GetPointsLetters(word: string) {
    var letters = word.toLowerCase().split('');
    var points = 0;
    letters.forEach((element) => {
      if (
        element === 'a' ||
        element === 'e' ||
        element === 'i' ||
        element === 'o' ||
        element === 'u' ||
        element === 'l' ||
        element === 'n' ||
        element === 's' ||
        element === 't' ||
        element === 'r'
      ) {
        points++;
      } else if (element === 'd' || element === 'g') {
        points += 2;
      } else if (
        element === 'b' ||
        element === 'c' ||
        element === 'm' ||
        element === 'p'
      ) {
        points += 3;
      } else if (
        element === 'f' ||
        element === 'h' ||
        element === 'v' ||
        element === 'w' ||
        element === 'y'
      ) {
        points += 4;
      } else if (element === 'k') {
        points += 5;
      } else if (element === 'j' || element === 'x') {
        points += 8;
      } else if (element === 'q' || element === 'z') {
        points += 10;
      } else {
        points += 20;
      }
    });
    return points;
  }
}
