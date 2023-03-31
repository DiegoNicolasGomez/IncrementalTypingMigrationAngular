import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersPerSecondComponent } from './letters-per-second.component';

describe('LettersPerSecondComponent', () => {
  let component: LettersPerSecondComponent;
  let fixture: ComponentFixture<LettersPerSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LettersPerSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LettersPerSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
