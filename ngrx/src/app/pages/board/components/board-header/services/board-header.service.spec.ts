import { TestBed } from '@angular/core/testing';

import { BoardHeaderService } from './board-header.service';

describe('BoardHeaderService', () => {
  let service: BoardHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
