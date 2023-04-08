import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { GameUtils } from '../../utils/utils';
import { ActiveService } from 'src/app/services/active.service';
import { PassiveService } from 'src/app/services/passive.service';
import { GameService } from 'src/app/services/game.service';
import { Generator } from '../../classes/generator';
import { BehaviorSubject, interval, map, Observable, of, switchMap } from 'rxjs';
// import translator from "./translator";

@Component({
  selector: 'app-passive-menu',
  templateUrl: './passive-menu.component.html',
  styleUrls: ['./passive-menu.component.scss'],
})
export class PassiveMenuComponent implements OnInit {

  generators: Generator[] = [];
  wordInterval$ = interval(5000);
  passiveWord$: Observable<string>;
  passivePoints$: Observable<number>;
  nextTierGeneratorsCost$: Observable<number>; 

  constructor(private activeService: ActiveService, 
    private passiveService: PassiveService, 
    private gameService: GameService) {
      this.passiveWord$ = this.passiveService.getPassiveWord();
      
      this.passivePoints$ = this.gameService.getGame().pipe(map(x => x.passivePoints));

      this.nextTierGeneratorsCost$ = this.gameService.getGame().pipe(map(game => {
        const nextTierGenerators = this.passiveService.getGenerators().find(generator => generator.id === game.passiveGenerators.length + 1);
      return nextTierGenerators ? nextTierGenerators.cost : 0;
      }));
    }

  gameUtils = new GameUtils(this.gameService);

  ngOnInit() {
    this.generators = this.gameService.game.value.passiveGenerators;
  }

  onGeneratorsChange(): void {
    this.generators = this.gameService.game.value.passiveGenerators;
  }

  BuyGenerator(generatorNumber: number) {
    const yourGenerator = this.gameService.game.value.passiveGenerators.find(
      (x) => x.id == generatorNumber
    );
    if (!yourGenerator) return;
    if (generatorNumber == 1) {
      if (this.gameService.game.value.passivePoints >= yourGenerator.cost) {
        this.gameService.updatePassivePoints(-yourGenerator.cost);
        this.gameService.buyGenerator(yourGenerator.id)
      }
    } else {
      if (
        this.gameService.game.value.passiveGenerators.find(
          (x) => x.id == generatorNumber - 1
        )!.amountGained >= yourGenerator.cost
      ) {
        this.gameService.removeGenerators(generatorNumber - 1, yourGenerator.cost)
        this.gameService.buyGenerator(yourGenerator.id)
      }
    }
    this.onGeneratorsChange();
  }

  BuyGeneratorTier() {
    const generatorToBuy = this.passiveService.getGenerators().find(
      (x) => x.id == this.gameService.game.value.passiveGenerators.length + 1
    );
    if (!generatorToBuy) return;
    if (
      this.gameService.game.value.passiveGenerators.find(
        (x) => x.id == generatorToBuy.id - 1
      )!.amountGained >= generatorToBuy.cost
    ) {
      this.gameService.removeGenerators(generatorToBuy.id - 1, generatorToBuy.cost);
      this.gameService.addGenerator(generatorToBuy);
      this.gameService.buyGenerator(generatorToBuy.id);

      const generator = document.querySelector(
        `#PassivePointsGenerator${generatorToBuy.id - 1}`
      );
      if (generator && generator instanceof HTMLElement)
        generator.style.display = 'block';
    }
    this.onGeneratorsChange();
  }

  shouldDisplayGenerator(id: number): boolean {
    const game = this.gameService.game.value;
    console.log(game.passiveGenerators.length);
    return game.passiveGenerators.length >= id;
  }
}
