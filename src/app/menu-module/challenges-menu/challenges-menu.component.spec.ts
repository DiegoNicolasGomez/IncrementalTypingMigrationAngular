import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesMenuComponent } from './challenges-menu.component';

describe('ChallengesMenuComponent', () => {
  let component: ChallengesMenuComponent;
  let fixture: ComponentFixture<ChallengesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
