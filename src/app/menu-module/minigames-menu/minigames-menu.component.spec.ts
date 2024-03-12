import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigamesMenuComponent } from './minigames-menu.component';

describe('MinigamesMenuComponent', () => {
  let component: MinigamesMenuComponent;
  let fixture: ComponentFixture<MinigamesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigamesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinigamesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
