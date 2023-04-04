import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-points-counter',
  templateUrl: './points-counter.component.html',
  styleUrls: ['./points-counter.component.scss']
})
export class PointsCounterComponent {
  points$: Observable<number>;

  constructor(private gameService: GameService) {
    this.points$ = this.gameService.getGame().pipe(map(x => x.points))
  }
}
