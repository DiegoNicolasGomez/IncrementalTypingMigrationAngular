import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTimerComponent } from './challenge-timer.component';

describe('ChallengeTimerComponent', () => {
  let component: ChallengeTimerComponent;
  let fixture: ComponentFixture<ChallengeTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
