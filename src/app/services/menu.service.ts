import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  navbarItems: {id: string, visible: boolean}[] = [
    {id: 'active', visible: true},
    {id: 'passive', visible: false},
    {id: 'upgrades', visible: true},
    {id: 'challenges', visible: false},
    {id: 'prestige', visible: false},
    {id: 'cards', visible: false},
    {id: 'achievements', visible: false},
    {id: 'stats', visible: true},
    {id: 'options', visible: true},
  ];

  navBarItemsSubject = new BehaviorSubject<{id: string, visible: boolean}[]>(this.navbarItems);

  constructor() { }

  getNavBarItems(): Observable<{id: string, visible: boolean}[]> {
    return this.navBarItemsSubject.asObservable();
  }

  updateNavbarItem(id: string) {
    const item = this.navbarItems.find(x => x.id == id);
     if(item) {
      item.visible = true;
      this.navBarItemsSubject.next(this.navbarItems);
     }
    
  }
}
