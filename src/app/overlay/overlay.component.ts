import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card, CardType } from '../classes/card';
import { GameService } from '../services/game.service';
import { OverlayService } from '../services/overlay.service';
import { GameUtils } from '../utils/utils';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  cards: Card[] = [];
  cardsSubscription = new Subscription();

  constructor(
    private overlayService: OverlayService,
    private gameService: GameService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    this.cardsSubscription = this.overlayService
      .getCards()
      .subscribe((cards) => {
        this.cards = cards;
        this.showOverlay();
      });
  }

  gameUtils = new GameUtils(this.gameService);

  ngOnDestroy() {
    this.cardsSubscription.unsubscribe();
  }

  getCardType(card: Card): string {
    return this.gameUtils.getCardType(card);
  }

  removeOverlay() {
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const light = this.el.nativeElement.querySelector('#light');
    const viewerCardsContainer = this.el.nativeElement.querySelector(
      '#viewerCardsContainer'
    );

    this.renderer.removeClass(overlay, 'show');
    this.renderer.removeClass(light, 'show');
    this.renderer.removeClass(viewerCardsContainer, 'viewerActive');
  }

  showOverlay() {
    if (this.cards.length == 0) return;
    const overlay = this.el.nativeElement.querySelector('#overlay');
    const light = this.el.nativeElement.querySelector('#light');
    const viewerCardsContainer = this.el.nativeElement.querySelector(
      '#viewerCardsContainer'
    );
    this.renderer.addClass(overlay, 'show');
    this.renderer.addClass(light, 'show');
    this.renderer.addClass(viewerCardsContainer, 'viewerActive');
  }
}
