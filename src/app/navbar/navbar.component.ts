import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarItems: {id: string, visible: boolean}[] = [
    {id: 'active', visible: true},
    {id: 'passive', visible: false},
    {id: 'upgrades', visible: true},
    {id: 'challenges', visible: false},
    {id: 'prestige', visible: false},
    {id: 'cards', visible: false},
    {id: 'achievements', visible: true},
    {id: 'stats', visible: true},
    {id: 'options', visible: true},
  ];

  navbarItemsSubscription = new Subscription;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.navbarItemsSubscription = this.menuService.getNavBarItems().subscribe((items) => {
      this.navbarItems = items;
    })
  }

  ngOnDestroy() {
    this.navbarItemsSubscription.unsubscribe();
  }
}