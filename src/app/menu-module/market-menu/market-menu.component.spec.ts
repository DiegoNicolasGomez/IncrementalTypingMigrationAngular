import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMenuComponent } from './market-menu.component';

describe('MarketMenuComponent', () => {
  let component: MarketMenuComponent;
  let fixture: ComponentFixture<MarketMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
