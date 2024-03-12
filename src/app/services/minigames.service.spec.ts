import { TestBed } from '@angular/core/testing';

import { MinigamesService } from './minigames.service';

describe('MinigamesService', () => {
  let service: MinigamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinigamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
