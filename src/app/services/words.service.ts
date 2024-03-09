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
import { ChallengesService, language } from './challenges.service';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  wordList: string[] = [];
  private currentWord = new BehaviorSubject<string>('');
  wordShifted = new Subject<void>();
  wordBonus: string = '';
  private critical = new BehaviorSubject<boolean>(false);
  hiraganaWordList: string[] = [
    'あお',
    'いえ',
    'うみ',
    'えんぴつ',
    'おおきい',
    'かぞく',
    'きいろい',
    'くるま',
    'けさ',
    'こども',
    'さくらんぼ',
    'しんぶん',
    'すし',
    'せんせい',
    'たけ',
    'ちず',
    'つくえ',
    'てがみ',
    'とけい',
    'なつ',
    'にんぎょう',
    'ぬいぐるみ',
    'ねこ',
    'はな',
    'ひる',
    'ふく',
    'へや',
    'ほん',
    'まんが',
    'やさい',
    'ゆうびんきょく',
    'よる',
    'らいがっき',
    'りんご',
    'れんしゅう',
    'わたし',
    'あたま',
    'いし',
    'うさぎ',
    'えき',
    'おにぎり',
    'かんじ',
    'きゅうり',
    'くつ',
    'げんき',
    'さかな',
    'しごと',
    'すき',
    'たなか',
    'ちかてつ',
    'つき',
    'てがみ',
    'ともだち',
    'なつやすみ',
    'にほん',
    'ぬの',
    'はし',
    'ひがし',
    'ふゆ',
    'へいわ',
    'まち',
    'やま',
    'ゆめ',
    'よる',
    'らくだ',
    'りょうり',
    'わたし',
    'あめ',
    'いす',
    'うでわ',
    'えほん',
    'おんがく',
    'かさ',
    'きょうしつ',
    'くつした',
    'げんき',
    'さんぽ',
    'あおい',
    'いしゃ',
    'うるし',
    'えきいん',
    'おかし',
    'かんじき',
    'きかんしゃ',
    'くもり',
    'けんしゅう',
    'こっぷ',
    'さくひん',
    'しお',
    'すずしい',
    'せかい',
    'たいいく',
    'ちずる',
    'つきあう',
    'てがみや',
    'とけいりょう',
    'なか',
    'にほんご',
    'ぬのぎ',
    'ねこみみ',
    'はこ',
    'ひび',
    'ふるい',
    'へんしん',
    'ほしぞら',
    'まど',
    'やさしい',
    'ゆうめい',
    'よるび',
    'らく',
    'りんごいし',
    'れきし',
    'わんぱく',
    'あいさつ',
    'いすと',
    'うらない',
    'えり',
    'おきる',
    'かいぎ',
    'きんえん',
    'くしゃみ',
    'げんじん',
    'さくひんか',
    'しばらく',
    'すぐれもの',
    'たいがく',
    'ちょっと',
    'つきあう',
    'てがみや',
    'とけいりょう',
    'なかよく',
    'にほんご',
    'ぬのぎ',
    'ねこみみ',
    'はこ',
    'ひび',
    'ふるい',
    'へんしん',
    'ほしぞら',
    'まど',
    'やさしい',
    'ゆうめい',
    'よるび',
    'らく',
    'りんごいし',
    'れきし',
    'わんぱく',
    'あいさつ',
    'いすと',
    'うらない',
    'えり',
    'おきる',
    'かいぎ',
    'きんえん',
    'くしゃみ',
    'げんじん',
    'さくひんか',
    'しばらく',
    'すぐれもの',
    'たいがく',
    'ちょっと',
  ];
  russianWordList: string[] = [
    'абажур',
    'белка',
    'вино',
    'гитара',
    'дом',
    'ежик',
    'жираф',
    'звезда',
    'изюм',
    'йогурт',
    'кот',
    'лето',
    'медведь',
    'ночь',
    'опера',
    'пальто',
    'роза',
    'солнце',
    'танец',
    'улица',
    'флаг',
    'хлеб',
    'цветок',
    'чай',
    'шапка',
    'щука',
    'ъявь',
    'ыгнать',
    'ьямка',
    'экран',
    'юмор',
    'ягода',
    'акция',
    'бюро',
    'возраст',
    'гимназия',
    'двор',
    'европа',
    'ёж',
    'журнал',
    'звук',
    'издание',
    'йод',
    'краска',
    'лужайка',
    'магия',
    'нога',
    'образ',
    'пятно',
    'работа',
    'смех',
    'трюк',
    'узор',
    'факт',
    'характер',
    'цепь',
    'чашка',
    'шум',
    'щит',
    'ъявь',
    'ыпуклость',
    'ьямка',
    'энергия',
    'юность',
    'ящик',
    'агент',
    'брюки',
    'возникнуть',
    'герой',
    'детство',
    'ежедневно',
    'желание',
    'золото',
    'изучение',
    'йога',
    'крюк',
    'лидер',
    'музей',
    'неделя',
    'образец',
    'авокадо',
    'багаж',
    'вечер',
    'город',
    'дочь',
    'ежевика',
    'жара',
    'зонт',
    'ирис',
    'йогурт',
    'красный',
    'летучая мышь',
    'мандарин',
    'ночь',
    'орех',
    'печь',
    'роза',
    'салат',
    'танец',
    'узор',
    'фонтан',
    'хлеб',
    'цветок',
    'чай',
    'шоколад',
    'щенок',
    'ъявь',
    'ыгнать',
    'ьямка',
    'экран',
    'юмор',
    'ягода',
    'акция',
    'буря',
    'возраст',
    'гимназия',
    'двор',
    'европа',
    'ёж',
    'журнал',
    'звук',
    'издание',
    'йод',
    'краска',
    'лужайка',
    'магия',
    'нога',
    'образ',
    'пятно',
    'работа',
    'смех',
    'трюк',
    'узор',
    'факт',
    'характер',
    'цвет',
    'чашка',
    'шум',
    'щит',
    'ъявь',
    'ыпуклость',
    'ьямка',
    'энергия',
    'юность',
    'ящик',
    'агент',
    'брюки',
    'возникнуть',
    'герой',
    'детство',
    'ежедневно',
    'желание',
    'золото',
    'изучение',
    'йога',
    'крюк',
    'лидер',
    'музей',
    'неделя',
    'образец',
    'печать',
    'рождество',
    'свеча',
    'тюльпан',
    'ухо',
    'фильм',
    'царь',
    'человек',
    'шарф',
    'щенок',
    'ъесть',
    'ыть',
    'ьямка',
    'энергия',
    'юность',
    'ящик',
    'агент',
    'брюки',
    'возникнуть',
    'герой',
    'медведь',
    'лес',
    'птица',
    'гора',
    'река',
    'озеро',
    'поле',
    'цветение',
    'весна',
    'лето',
    'осень',
    'зима',
    'снег',
    'солнце',
    'луна',
    'звезда',
    'воздух',
    'вода',
    'огонь',
    'земля',
  ];
  amharicWordList: string[] = [
    'አቀፍ',
    'ተመላ',
    'አዋጅ',
    'አሸባሪ',
    'ተመዝግቦ',
    'አይተገኝም',
    'መተየት',
    'መጠቀም',
    'አጠቃላይ',
    'እትዬ',
    'መጠበቅ',
    'አያዝ',
    'እንዲህ',
    'ወደታች',
    'አላነበበም',
    'አስቀድመኝ',
    'አበሳሽ',
    'ታምራት',
    'ሀብታች',
    'በደንበር',
    'እናት',
    'አዋሽ',
    'ከአባይ',
    'እናሠንቆ',
    'መክበብ',
    'አሁንም',
    'ከብት',
    'ወደደለት',
    'አካይደኛ',
    'አካይደኛ',
    'እንደአንደኛ',
    'የእኔን',
    'ሁኔታ',
    'ያስተምረኝ',
    'እንደገና',
    'እንደሚሆን',
    'የተመነ',
    'አደጋ',
    'መከላከል',
    'ሌባ',
    'ተለዋወጥ',
    'እንደአንደኛ',
    'አካይደኛ',
    'ስነስርዓት',
    'ያጠፋኛል',
    'ከታች',
    'ማዕዘን',
    'ያንዳንዱ',
    'እንደዚህ',
    'ሲል',
    'ለኔ',
    'አንደኛው',
    'በደንብ',
    'እንደአንደኛው',
    'ተጣምራት',
    'ያለው',
    'ከአንደኛው',
    'መንገድ',
    'ስራ',
    'ስለሚጠቅም',
    'ደህንነት',
    'መንከሳት',
    'መጠጥ',
    'መንገድ',
    'መንግስቱ',
    'መከላከል',
    'መንደፊያ',
    'መኖ',
    'መጠቀም',
    'መረጃ',
    'አንደኛ',
    'አንደኛው',
    'አንደኛዋ',
    'አንደኛዎች',
    'አንደኛውን',
    'አንደኛውንው',
    'አንደኛውንዋ',
    'አንደኛዎችን',
    'አንደኛውንውን',
    'አንደኛውንዋን',
    'አንደኛዎችንው',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንውን',
    'አንደኛውንዋን',
    'አንደኛውንዋንው',
    'አንደኛውንዋ',
    'አንደኛውንው',
    'አንደኛዎችንዋ',
    'አንደኛውንውን',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛውንዋ',
    'አንደኛውንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛውንዋ',
    'አንደኛውንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
  ];
  language: language = 'English';

  constructor(
    private gameService: GameService,
    private http: HttpClient,
    private activeService: ActiveService,
    private achievementService: AchievementsService,
    private masteryService: MasteryService,
    private challengeService: ChallengesService
  ) {
    this.challengeService
      .getLanguage()
      .subscribe((language) => (this.language = language));
  }

  gameUtils = new GameUtils(this.gameService);

  generateWord() {
    let generatedWord: string = '';
    switch (this.language) {
      case 'English':
        var filteredWordList = this.wordList.filter(
          (x) => x.length <= this.gameService.game.value.maxLength
        );
        generatedWord =
          filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
        break;
      case 'Russian':
        generatedWord =
          this.russianWordList[
            Math.floor(Math.random() * this.russianWordList.length)
          ];
        break;
      case 'Japanese':
        generatedWord =
          this.hiraganaWordList[
            Math.floor(Math.random() * this.hiraganaWordList.length)
          ];
        break;
        case 'Amharic':
          generatedWord = this.amharicWordList[
            Math.floor(Math.random() * this.amharicWordList.length)
          ];
          break;
    }

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
      var lettersValue = 0;
      lettersValue = this.activeService.GetPointsLetters(word);
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
