import { TestBed } from '@angular/core/testing';

import { ViewSchemaService } from './view-schema.service';

describe('ViewSchemaService', () => {
  let service: ViewSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
