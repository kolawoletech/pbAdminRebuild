import { TestBed, inject } from '@angular/core/testing';

import { ProService } from './pro.service';

describe('ProService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProService]
    });
  });

  it('should be created', inject([ProService], (service: ProService) => {
    expect(service).toBeTruthy();
  }));
});
