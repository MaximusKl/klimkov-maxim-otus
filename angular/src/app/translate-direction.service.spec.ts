import { TestBed } from '@angular/core/testing';

import { TranslateDirectionService } from './translate-direction.service';

describe('TranslateDirectionService', () => {
  let service: TranslateDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
